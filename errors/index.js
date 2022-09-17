const CustomAPIError = require('./custom-api')
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')
const UnauthorizedError = require('./unauthorized')

// all custom errors that extend from CustomAPI error
// each of them has different purpose and implies to specific status code ex. 404 - BadRequest
module.exports = {
	CustomAPIError,
	UnauthenticatedError,
	NotFoundError,
	BadRequestError,
	UnauthorizedError,
}
