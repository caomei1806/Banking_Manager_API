const mongoose = require('mongoose')
const createDBConnection = require('../db/createConnection')
const checkConnection = require('../db/checkConnection')
const checkIfBankBranchExists = async (branchIdentifierCandidate) => {
	console.log('2' + branchIdentifierCandidate)

	const bankBranches = createDBConnection(process.env.MONGO_URL_BANK, {})
	await checkConnection(bankBranches)

	//create model for the existing mongo document
	const schema = new mongoose.Schema({})
	const BankBranch = bankBranches.model('Branch', schema, 'Branches')

	const branchesData = await BankBranch.find({}).select('-_id branchIdentifier')
	const branchIdentifiersArray = []
	branchesData.forEach((branch) => {
		branchIdentifiersArray.push(branch['_doc'].branchIdentifier)
	})
	return branchIdentifiersArray.includes(branchIdentifierCandidate)
}
module.exports = checkIfBankBranchExists
