const CustomError = require('../errors')

// allows getting into next step if user has permission to make action
// if its an admin user or the owner then it performs correctly
const chechPermissions = (requestUser, resourceUserId) => {
	if (requestUser.role === 'admin') return
	if (requestUser.userId === resourceUserId.toString()) return
	throw new CustomError.UnauthorizedError('Not authorized to access this route')
}

module.exports = chechPermissions
