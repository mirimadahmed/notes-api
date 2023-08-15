const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
// Routes
const routes = require('./routes/index')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' })
})
app.use('/api', routes) // Adjust the base path as per your preference

// Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(err) // Log the error
  res.status(500).json({ error: 'Internal Server Error' })
})

module.exports = app
