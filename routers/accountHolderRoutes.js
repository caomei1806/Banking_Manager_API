const express = require('express')
const {
	setupAccountHolder,
	createAccount,
	getAllUsers,
	getSingleUser,
	showCurrentAccountHolder,
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
router.route('/show-me').get(authenticateUser, showCurrentAccountHolder)

router.route('/:id').get(authenticateUser, getSingleUser)

module.exports = router
