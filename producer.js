const amqp = require('amqplib')
const config = require('./amqpConfig')

const connectRabbitMq = async (message) => {
	const msgBuffer = Buffer.from(JSON.stringify(message))
	try {
		console.log('')
		const connection = await amqp.connect(config.rabbitMQ.url)
		const channel = await connection.createChannel()
		await channel.assertQueue(config.rabbitMQ.exchangeName)
		await channel.sendToQueue(config.rabbitMQ.exchangeName, msgBuffer)
		await channel.close()
		await connection.close()
	} catch (err) {
		console.log(err)
	}
}
module.exports = { connectRabbitMq }
