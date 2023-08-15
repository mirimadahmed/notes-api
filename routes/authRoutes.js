const express = require('express')
const UserController = require('../controllers/UserController')
const { validateSignup, validateLogin } = require('../middlewares/userValidation')

const router = express.Router()
const userController = new UserController()

// Signup route
router.post('/signup', validateSignup, userController.signup.bind(userController))

// Login route
router.post('/login', validateLogin, userController.login.bind(userController))

module.exports = router
