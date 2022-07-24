require('express-async-errors')
require('dotenv').config()

const express = require('express')
const amqp = require('amqplib')
const app = express()

// additional packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')

// database connection
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routers/authRoutes')
const accountHolderRouter = require('./routers/accountHolderRoutes')
const accountRouter = require('./routers/accountRoutes')
const userRouter = require('./routers/userRoutes')

// middleware
const NotFoundMiddleware = require('./middleware/not-found')
const ErrorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(
	rateLimiter({
		windowsMs: 15 * 60 * 1000,
		max: 60,
	})
)
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./public'))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/account-holder', accountHolderRouter)
app.use('/api/v1/account', accountRouter)
app.use('/api/v1/user', userRouter)

app.use(NotFoundMiddleware)
app.use(ErrorHandlerMiddleware)

const port = process.env.APPID || 5000

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL)
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}...`)
		})
	} catch (error) {
		console.log(error)
	}
}
start()
