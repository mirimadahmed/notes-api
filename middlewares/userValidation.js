const { body, validationResult } = require('express-validator')

// Validation middleware for signup
exports.validateSignup = [
  body('email').notEmpty().isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors
]

// Validation middleware for login
exports.validateLogin = [
  body('email').notEmpty().isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors
]

// Middleware to handle validation errors
function handleValidationErrors (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  next()
}
