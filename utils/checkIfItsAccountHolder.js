const CustomError = require('../errors')

const checkIfItsAccountHolder = (
	requestAccountHolder,
	resourceAccountHolder
) => {
	if (
		requestAccountHolder._id.toString() === resourceAccountHolder._id.toString()
	)
		return true
	throw new CustomError.UnauthorizedError('Not authorized to access this route')
}

module.exports = checkIfItsAccountHolder
