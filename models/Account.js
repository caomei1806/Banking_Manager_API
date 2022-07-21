const mongoose = require('mongoose')
const CustomError = require('../errors')
const {
	performExternalTransaction,
} = require('../services/performExternalTransaction')

const AccountSchema = mongoose.Schema(
	{
		accountNo: {
			type: String,
			required: [true, 'Please provide account number'],
		},
		country: {
			type: String,
			enum: {
				values: ['PL'],
				message: '{VALUE} is not supported',
			},
			default: 'PL',
		},
		currency: {
			type: String,
			enum: {
				values: ['pln', 'usd', 'eur', 'gbp'],
				message: '{VALUE} is not supported',
			},
			default: 'pln',
		},
		balance: {
			type: Number,
			default: 0,
		},
		accountBlocked: {
			type: Boolean,
			default: false,
		},
		accountHolder: {
			type: mongoose.Types.ObjectId,
			ref: 'AccountHolder',
			required: true,
		},
	},
	{ timestamps: true }
)
AccountSchema.methods.makeTransaction = async function (
	transactionType,
	amount
) {
	if (this.accountBlocked)
		return new CustomError.BadRequestError('Unable to complete transaction')
	console.log(transactionType + ' ' + amount)
	switch (transactionType) {
		case 'withdraw': {
			console.log(this.balance)
			if (this.balance - amount >= 0) {
				return (this.balance -= amount)
			} else {
				throw new CustomError.BadRequestError('Unable to complete transaction')
			}
		}
		case 'deposit': {
			return (this.balance += amount)
		}
		case 'transfer': {
			if (this.balance - amount >= 0) {
				return (this.balance -= amount)
			} else {
				throw new CustomError.BadRequestError('Unable to complete transaction')
			}
		}
		default:
			return new CustomError.BadRequestError('Invalid transaction type')
	}
}
module.exports = mongoose.model('Account', AccountSchema)
