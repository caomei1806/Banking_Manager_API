const Transaction = require('../models/Transaction')
const Account = require('../models/Account')
const performExternalTransaction = async (externalTransfer) => {
	const { title, amount, account, receiverAccount } = externalTransfer
	const incomomingTransferDeposit = await Transaction.create({
		title,
		action: 'deposit',
		amount,
		account: receiverAccount,
		addresseeAccount: account,
	})
}
module.exports = { performExternalTransaction }
