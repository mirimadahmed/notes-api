const jwt = require('jsonwebtoken')
const UserService = require('../services/UserService') // Replace the path with the correct location of your UserService.js file

// Authentication middleware
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' })
  }
  const token = authHeader.substring(7)
  // Verify the token
  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
      const { userId } = decoded
      // Check if the user exists
      const userService = new UserService()
      const user = await userService.getUserById(userId)
      if (!user) {
        return res.status(401).json({ message: 'Invalid or expired token' })
      }
      // Token is valid, attach the decoded user information to the request object
      req.user = user
      next()
    } catch (error) {
      // Token is invalid or expired
      return res.status(401).json({ message: 'Invalid or expired token' })
    }
  } else {
    // Token is missing
    return res.status(401).json({ message: 'Missing token' })
  }
}

module.exports = authenticate
