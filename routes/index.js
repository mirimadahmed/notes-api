const express = require('express')
const router = express.Router()
const authRoutes = require('./authRoutes')

// Signup route
router.use('/auth', authRoutes)

module.exports = router
