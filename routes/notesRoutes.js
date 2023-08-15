const express = require('express')
const router = express.Router()

const NotesController = require('../controllers/NotesController')
const authMiddleware = require('../middlewares/authenticate')
const { createNotesValidationRules, updateNotesValidationRules } = require('../middlewares/notesValidation')
const NotesController = new NotesController()

// Define the route handlers
router.get('/', authMiddleware, NotesController.getAllUserNotes.bind(NotesController))
router.get('/:noteId', authMiddleware, NotesController.getNoteById.bind(NotesController))
router.post('/', authMiddleware, createNotesValidationRules, NotesController.createNewNote.bind(NotesController))
router.put('/:noteId', authMiddleware, updateNotesValidationRules, NotesController.updateNote.bind(NotesController))
router.delete('/:noteId', authMiddleware, deleteNotesValidationRules, NotesController.deleteNote.bind(NotesController))

module.exports = router
