const { body, validationResult } = require('express-validator')

// Validation middleware for creating a note
exports.createNotesValidationRules = [
  body('title').trim().notEmpty().isLength({ min: 2, max: 100 }).withMessage('Note title must be between 2 and 100 characters'),
  body('content').trim().optional().isLength({ min: 2, max: 50 }).withMessage('Note content'),
  body('type').trim().optional().isLength({ min: 2, max: 50 }).withMessage('Not type'),
  handleValidationErrors
]

// Validation middleware for updating a note
exports.updateNotesValidationRules = [
  body('noteId').isInt({ min: 1 }).withMessage('Note Id Must be sent to update it'),
  body('title').trim().optional().isLength({ min: 2, max: 100 }).withMessage('Note title must be between 2 and 100 characters'),
  body('content').trim().optional().isLength({ min: 2, max: 500 }).withMessage('Content Length'),
  body('type').isInt({ min: 1, max: 2 }).optional().isLength({ min: 2, max: 50 }).withMessage('Not type'),
  handleValidationErrors
]

// Validation middleware for deleting a note
exports.deleteNotesValidationRules = [
  body('noteId').isInt({ min: 1 }).withMessage('Note Id Must be sent to delete it'),
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
