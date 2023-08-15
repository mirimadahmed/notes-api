const express = require('express')
const router = express.Router()
const authRoutes = require('./authRoutes')
const notesRoutes = require('./notesRoutes')

router.use('/auth', authRoutes)
router.use('./notes', notesRoutes)

module.exports = router
