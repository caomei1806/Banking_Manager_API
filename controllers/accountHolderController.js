const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const AccountHolder = require('../models/AccountHolder')
const Account = require('../models/Account.js')
const { generateDigitString } = require('../utils')
const { getAccountNo } = require('../services/accountNoGenerator')

// first setup after user registration
// it's a necessery step to get access to creation of bank accounts and making bank transactions
const setupAccountHolder = async (req, res) => {
	const { fullname, personalIDNo, address } = req.body
	const isAccountHolderInfoSetup = await AccountHolder.findOne({
		user: req.user.userId,
	})
	console.log(req.user.userId)
	if (isAccountHolderInfoSetup) {
		res
			.status(StatusCodes.PERMANENT_REDIRECT)
			.json({ user: isAccountHolderInfoSetup })
		console.log('yes', isAccountHolderInfoSetup)
	}
	if (!isAccountHolderInfoSetup) {
		if (!fullname || !address || !personalIDNo) {
			throw new CustomError.BadRequestError('Please provide full account info')
		}
		const accountHolder = await AccountHolder.create({
			fullname,
			personalIDNo,
			address,
			user: req.user.userId,
		})
		res.status(StatusCodes.CREATED).json({ user: accountHolder })
	}
}

// account creation, task is completed only if the branch identifier is valid (existing branches are fetched from a database)
const createAccount = async (req, res) => {
	const { currency, branchIdentifier } = req.body

	// check if there account holder completed all registration steps
	const accountHolder = await AccountHolder.findOne({ user: req.user.userId })
	if (!accountHolder) {
		throw new CustomError.UnauthenticatedError('Please setup account holder')
	}
	// generate account number
	const accountNo = await getAccountNo(branchIdentifier)
	console.log('here here')

	const account = await Account.create({
		accountNo,
		currency,
		accountHolder: accountHolder._id,
	})

	res.status(StatusCodes.CREATED).json({ account })
}

// get all account holders with their bank accounts
const getAllUsers = async (req, res) => {
	const accountHolders = await AccountHolder.find({}).populate('accounts')

	res
		.status(StatusCodes.OK)
		.json({ accountHolders, accountHoldersAmount: accountHolders.length })
}

// get single user with their accounts
const getSingleUser = async (req, res) => {
	const { id: accountId } = req.params
	const accountHolder = await AccountHolder.findOne({
		_id: accountId,
	}).populate('accounts')
	res.status(StatusCodes.OK).json({ accountHolder })
}
const showCurrentAccountHolder = async (req, res) => {
	const currentHolder = await AccountHolder.findOne({
		user: req.user.userId,
	})
	res.status(StatusCodes.OK).json({ currentHolder, mgg: 'ok' })
}

module.exports = {
	setupAccountHolder,
	createAccount,
	getAllUsers,
	getSingleUser,
	showCurrentAccountHolder,
}
