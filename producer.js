const amqp = require('amqplib')
const config = require('./amqpConfig')

const connectRabbitMq = async (message) => {
	const msgBuffer = Buffer.from(JSON.stringify(message))
	// create connection and channel
	const connection = await amqp.connect(config.rabbitMQ.url)
	const channel = await connection.createChannel()
	try {
		// setup exchange and queue
		await channel.assertExchange(config.rabbitMQ.exchangeName)
		await channel.assertQueue(config.rabbitMQ.queue)
		await channel.bindQueue(
			config.rabbitMQ.queue,
			config.rabbitMQ.exchangeName,
			config.rabbitMQ.routingKey
		)

		await channel.sendToQueue(config.rabbitMQ.queue, msgBuffer)
	} catch (err) {
		console.log(err)
	} finally {
		await channel.close()
		await connection.close()
	}
}
module.exports = { connectRabbitMq }
