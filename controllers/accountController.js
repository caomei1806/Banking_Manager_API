const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const Account = require('../models/Account')
const AccountHolder = require('../models/AccountHolder')
const Transaction = require('../models/Transaction')
const { checkIfItsAccountHolder } = require('../utils')
const {
	performExternalTransaction,
} = require('../services/performExternalTransaction')
const checkIfBankAccountNoIsValid = require('../services/checkIfBankAccountNoIsValid')
const { ObjectId } = require('mongodb')

// returns all bank accounts or ones that match filter option
const getAllAccounts = async (req, res) => {
	const { filterKey, filterOptions } = req.query
	const accounts = await Account.find({ [filterKey]: [filterOptions] })

	const account = await Account.findOne({})
	const accountKeys = Object.keys(account._doc)

	if (!accountKeys.includes(filterKey)) {
		throw new CustomError.BadRequestError('Invalid filter key')
	}

	res.status(StatusCodes.OK).json({ accounts, accountsAmount: accounts.length })
}
const makeTransactionOnAccount = async (req, res) => {
	const { id: accoundId } = req.params
	const { transactionType, transactionTitle, amount, receiverAccountNo } =
		req.body
	// find account which performs transaction
	const account = await Account.findOne({ _id: accoundId })
	if (!account) {
		throw new CustomError.BadRequestError(
			`Account with id: ${accoundId} does not exist`
		)
	}
	//
	// find account holder which is currently logged in
	const currentAccountHolder = await AccountHolder.findOne({
		user: req.user.userId,
	})
	//
	// check if account holder is the owner if the account
	const isUserAccountHolder = checkIfItsAccountHolder(
		currentAccountHolder,
		account.accountHolder
	)
	if (!amount) {
		throw new CustomError.BadRequestError('Please enter transfer amount')
	}
	//
	// declere balance varaiable to alter it depending on the transaction type
	let currentBalance
	// perform if transaction type is deposit or withdraw
	if (transactionType === 'deposit' || transactionType === 'withdraw') {
		const transferAction = await Transaction.create({
			title: transactionTitle,
			action: transactionType,
			amount,
			account: account._id,
		})
		currentBalance = await account.makeTransaction(
			transactionType,
			Number(amount)
		)
	}
	//
	//perform if the transaction type is transfer
	if (transactionType === 'transfer') {
		// find the receivers account
		const receiverAccount = await Account.findOne({
			accountNo: receiverAccountNo,
		})
		if (!receiverAccount) {
			const isForeignAccountNoValid =
				checkIfBankAccountNoIsValid(receiverAccountNo)
			if (!isForeignAccountNoValid) {
				throw new CustomError.BadRequestError('Account Number not valid')
			}
		}

		// create transaction adnotation
		const transferAction = await Transaction.create({
			title: transactionTitle,
			action: transactionType,
			amount,
			account: account._id,
			receiverAccount: receiverAccount
				? receiverAccount._id
				: receiverAccount._id,
		})

		// get current balance by making transaction on the model document
		currentBalance = await account.makeTransaction(
			transactionType,
			Number(amount)
		)
		// if receiver's bank account is in the same bank
		if (receiverAccount) {
			// get receiver's balance
			const receiverAccountBalance = await receiverAccount.makeTransaction(
				'deposit',
				Number(amount)
			)

			// create transaction on the receiver's end
			performExternalTransaction(transferAction)

			// update receiver's balance
			receiverAccount.balance = Number(receiverAccountBalance)
			receiverAccount.save()
		}
	}

	account.balance = Number(currentBalance)
	account.save()

	res.status(StatusCodes.OK).json({ account })
}

module.exports = {
	getAllAccounts,
	makeTransactionOnAccount,
}
