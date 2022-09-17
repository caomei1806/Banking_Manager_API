const Transaction = require('../models/Transaction')
const Account = require('../models/Account')

// documents new transaction
// doesn't alter balance of any involved accounts
const performExternalTransaction = async (externalTransfer) => {
	const { title, amount, account, receiverAccount } = externalTransfer
	console.log('Transer' + receiverAccount)
	const incomomingTransferDeposit = await Transaction.create({
		title,
		action: 'deposit',
		amount,
		account: receiverAccount,
		addresseeAccount: account,
	})
	console.log('Good' + receiverAccount)
}
module.exports = { performExternalTransaction }
