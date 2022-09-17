const mongoose = require('mongoose')
const createDBConnection = require('../db/createConnection')
const checkConnection = require('../db/checkConnection')
const checkIfBankBranchExists = async (branchIdentifierCandidate) => {
	console.log('2' + branchIdentifierCandidate)

	// connect with bank database
	const bankBranches = createDBConnection(process.env.MONGO_URL_BANK, {})
	// check if connection performed without errors
	await checkConnection(bankBranches)

	//create blank branch model to be able to search through existing database data
	const schema = new mongoose.Schema({})
	const BankBranch = bankBranches.model('Branch', schema, 'Branches')

	const branchesData = await BankBranch.find({}).select('-_id branchIdentifier')
	const branchIdentifiersArray = []
	// get all existing branch identifiers from database
	branchesData.forEach((branch) => {
		branchIdentifiersArray.push(branch['_doc'].branchIdentifier)
	})
	// return true if emplied branch identifier exists withing branches
	return branchIdentifiersArray.includes(branchIdentifierCandidate)
}
module.exports = checkIfBankBranchExists
