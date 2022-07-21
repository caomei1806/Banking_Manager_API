const express = require('express')
const {
	setupAccountHolder,
	createAccount,
	getAllUsers,
	getSingleUser,
} = require('../controllers/accountHolderController')
const {
	authenticateUser,
	authorizePermissions,
} = require('../middleware/authentication')
const router = express.Router()

router.route('/account-setup').post(authenticateUser, setupAccountHolder)
router.route('/create-bank-account').post(authenticateUser, createAccount)
router
	.route('/')
	.get(authenticateUser, authorizePermissions('admin'), getAllUsers)
router.route('/:id').get(authenticateUser, getSingleUser)

module.exports = router
