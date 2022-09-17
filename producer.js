const amqp = require('amqplib')
const config = require('./amqpConfig')

const AMQP_URL = process.env.MESSAGE_QUEUE || config.rabbitMQ.url

const connectRabbitMq = async (message) => {
	const msgBuffer = Buffer.from(JSON.stringify(message))
	// create connection and channel
	const connection = await amqp.connect(AMQP_URL)
	const channel = await connection.createChannel()
	try {
		// setup exchange and queue
		await channel.assertQueue(config.rabbitMQ.queue, { durable: false })

		await channel.sendToQueue(config.rabbitMQ.queue, msgBuffer)
	} catch (err) {
		console.log(err)
	} finally {
		await channel.close()
		await connection.close()
	}
}
module.exports = { connectRabbitMq }
