const Account = require('../models/Account.js')
const CustomError = require('../errors')
const { generateDigitString } = require('../utils')
const checkIfBankBranchExists = require('../services/checkIfBankBranchExists')

const calculateBankBranchCheckNo = (bankIdentifier) => {
	const weightFactor = [3, 9, 7, 1, 3, 9, 7]
	let sum = 0
	for (let i = 0; i < 7; i++) {
		sum += parseInt(bankIdentifier[i]) * weightFactor[i]
	}
	return sum % 10 > 0 ? 10 - (sum % 10) : 0
}
const generateBankBranchCheckNo = (branchIdentifier) => {
	let bankIdentifier = `2020${branchIdentifier}`
	bankIdentifier += calculateBankBranchCheckNo(bankIdentifier)
	return bankIdentifier
}
const calculateCheckDigits = (accountNo) => {
	const letterDigitValue = {
		A: 10,
		B: 11,
		C: 12,
		D: 13,
		E: 14,
		F: 15,
		G: 16,
		H: 17,
		I: 18,
		J: 19,
		K: 20,
		L: 21,
		M: 22,
		N: 23,
		O: 24,
		P: 25,
		Q: 26,
		R: 27,
		S: 28,
		T: 29,
		U: 30,
		V: 31,
		W: 32,
		X: 33,
		Y: 34,
		Z: 35,
	}

	let first4CharsAccountNo = accountNo.slice(0, 4)
	let firstLetterToDigit = letterDigitValue[first4CharsAccountNo[0]]
	let secondLetterToDigit = letterDigitValue[first4CharsAccountNo[1]]

	const newFirst4CharsAccountNo =
		firstLetterToDigit.toString() +
		secondLetterToDigit.toString() +
		first4CharsAccountNo.slice(2, 4)
	let tempAccountNo =
		accountNo.slice(4, accountNo.length) + newFirst4CharsAccountNo
	const remainerFromDividing = tempAccountNo % 97
	const checkDigits =
		98 - remainerFromDividing >= 10
			? 98 - remainerFromDividing
			: `0${98 - remainerFromDividing}`
	return checkDigits
}
///////////////////////////////////////
const generateBankAccountNo = (branchIdentifierCandidate) => {
	let accountNo = `PL00${generateBankBranchCheckNo(
		branchIdentifierCandidate
	)}${generateDigitString(16)}`
	const accountNoCalculatedCheckDigits = calculateCheckDigits(accountNo)
	accountNo = accountNo.replace('PL00', `PL${accountNoCalculatedCheckDigits}`)
	return accountNo
}
const getAccountNo = async (branchIdentifierCandidate = '000') => {
	let accountNo = generateBankAccountNo(branchIdentifierCandidate)
	let isAccountNoAvaiable = await Account.findOne({ accountNo })
	while (isAccountNoAvaiable) {
		const newAccountNo = generateBankAccountNo(branchIdentifierCandidate)
		const isAvaiable = await Account.findOne({
			newAccountNo,
		})
		if (!isAvaiable) {
			accountNo = newAccountNo
			break
		}
		continue
	}
	const doesBranchExist = await checkIfBankBranchExists(
		branchIdentifierCandidate
	)
	if (!doesBranchExist) {
		console.log('Error!')
		throw new CustomError.BadRequestError('Unidentified Bank Branch')
	}
	return accountNo
}

module.exports = { getAccountNo }
