const jwt = require('jsonwebtoken')
const UserService = require('../services/UserService') // Replace the path with the correct location of your UserService.js file
const userService = new UserService()

class UserController {
  async signup (req, res) {
    try {
      const { email, password } = req.body

      // Check if the user already exists
      const existingUser = await userService.getUserByEmail(email)
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' })
      }

      // Create a new user
      const newUser = await userService.createUser({ username, email, password })

      // Generate JWT token
      const token = jwt.sign({ userId: newUser.id, tokenVersion: 0 }, process.env.JWT_SECRET_KEY)

      // Respond with the token and user data
      res.json({ token, user: newUser })
    } catch (error) {
      console.error('Error during sign up:', error)
      res.status(500).json({ message: 'Sign up failed' })
    }
  }

  async login (req, res) {
    try {
      const { email, password } = req.body

      // Check if the user exists
      const user = await userService.getUserByEmail(email)
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      // Verify the password
      const validatedUser = await userService.verifyUserPassword(user, password)
      if (!validatedUser) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }
      await userService.updateTokenVersion(validatedUser)
      // Generate JWT token
      const token = jwt.sign({ userId: user.id, tokenVersion: validatedUser.tokenVersion }, process.env.JWT_SECRET_KEY)

      // Respond with the token and user data
      res.json({ token, user })
    } catch (error) {
      console.error('Error during login:', error)
      res.status(500).json({ message: 'Login failed' })
    }
  }

  async getUser (req, res) {
    res.json({ user: req.user })
  }
}

module.exports = UserController
