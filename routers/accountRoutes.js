const express = require('express')
const {
	getAllAccounts,
	makeTransactionOnAccount,
} = require('../controllers/accountController')
const { authenticateUser } = require('../middleware/authentication')
const router = express.Router()

router.route('/').get(getAllAccounts)
router
	.route('/:id/transaction')
	.post(authenticateUser, makeTransactionOnAccount)

module.exports = router
