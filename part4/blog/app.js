const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
require('express-async-errors')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)
logger.info('connecting to MongoDB...')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('...connected to MongoDB!')
    })
    .catch(error => {
        logger.error('error connecting to MongoDB: ', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
