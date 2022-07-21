const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt')
const createTokenUser = require('./createTokenUser')
const checkPermissions = require('./checkPermissions')
const createHash = require('./createHash')
const generateDigitString = require('./generateDigitString')
const checkIfItsAccountHolder = require('./checkIfItsAccountHolder')

module.exports = {
	createJWT,
	isTokenValid,
	attachCookiesToResponse,
	createTokenUser,
	checkPermissions,
	createHash,
	generateDigitString,
	checkIfItsAccountHolder,
}
