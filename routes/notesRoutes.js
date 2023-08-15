const express = require('express')
const router = express.Router()

const NotesController = require('../controllers/NotesController')
const authMiddleware = require('../middlewares/authenticate')
const { createNotesValidationRules, updateNotesValidationRules } = require('../middlewares/notesValidation')
const NotesController = new NotesController()

// Define the route handlers
router.use(authMiddleware);
router.get('/', NotesController.getAllUserNotes.bind(NotesController))
router.get('/:noteId', NotesController.getNoteById.bind(NotesController))
router.post('/', createNotesValidationRules, NotesController.createNewNote.bind(NotesController))
router.put('/:noteId', updateNotesValidationRules, NotesController.updateNote.bind(NotesController))
router.delete('/:noteId', deleteNotesValidationRules, NotesController.deleteNote.bind(NotesController))

module.exports = router
