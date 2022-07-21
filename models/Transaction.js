const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema(
	{
		title: {
			type: String,
			default: 'money transfer',
		},
		action: {
			type: String,
			enum: {
				values: ['deposit', 'withdraw', 'transfer'],
				message: '{VALUE} is not supported',
			},
		},
		amount: {
			type: Number,
			required: [true, 'Please provide transaction amount'],
		},
		account: {
			type: mongoose.Types.ObjectId,
			ref: 'Account',
			required: true,
		},
		receiverAccount: {
			type: String,
			required: function () {
				return this.action === 'transfer' ? true : false
			},
		},
		addresseeAccount: {
			type: mongoose.Types.ObjectId,
			ref: 'Account',
			required: function () {
				return this.action === 'transfer' && !this.receiverAccount
					? true
					: false
			},
		},
	},
	{ timestamps: true }
)
module.exports = mongoose.model('Transaction', TransactionSchema)
