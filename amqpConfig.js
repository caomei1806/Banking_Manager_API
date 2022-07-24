module.exports = {
	rabbitMQ: {
		url: 'amqp://localhost/',
		exchangeName: 'verificationExchange',
		queue: 'user.sign_up_email',
		routingKey: 'sign_up_email',
	},
}
