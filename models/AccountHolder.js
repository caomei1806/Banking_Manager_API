const mongoose = require('mongoose')
const Account = require('./Account')

const AccountHolderSchema = mongoose.Schema(
	{
		fullname: {
			type: String,
			required: [true, 'Please provide full name'],
			minlength: 3,
			maxlength: 50,
		},
		personalIDNo: {
			type: String,
			required: [true, 'Please provide Personal ID Number '],
			length: 11,
		},
		address: {
			type: String,
			required: [true, 'Please provide your full address'],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)
// enable account holder to have multiple bank accounts
AccountHolderSchema.virtual('accounts', {
	ref: 'Account',
	localField: '_id',
	foreignField: 'accountHolder',
	justOne: false,
})
module.exports = mongoose.model('AccountHolder', AccountHolderSchema)
