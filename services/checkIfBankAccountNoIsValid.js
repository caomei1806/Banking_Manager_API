const BigNumber = require('big-number')
const checkIfBankAccountNoIsValid = (accountNo) => {
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
	const accountNoWithoutExtraCharacters = accountNo.replace(
		/[^0-9a-zA-Z]/gi,
		''
	)
	let first4CharsAccountNo = accountNoWithoutExtraCharacters.slice(0, 4)
	let firstLetterToDigit = letterDigitValue[first4CharsAccountNo[0]]
	let secondLetterToDigit = letterDigitValue[first4CharsAccountNo[1]]
	const formattedAccountNo =
		accountNoWithoutExtraCharacters.slice(
			4,
			accountNoWithoutExtraCharacters.length
		) +
		firstLetterToDigit +
		secondLetterToDigit +
		first4CharsAccountNo.slice(2, 4)
	const formattedAccountNoDivided = BigNumber(formattedAccountNo).mod(97)

	if (formattedAccountNoDivided == 1) {
		console.log('correct')
		return true
	}
	return false
}
module.exports = checkIfBankAccountNoIsValid
