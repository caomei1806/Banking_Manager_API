module.exports = {
	rabbitMQ: {
		url: 'amqp://localhost:5672',
		exchangeName: 'verificationExchange',
		queue: 'user.sign_up_email',
		routingKey: 'sign_up_email',
	},
}
