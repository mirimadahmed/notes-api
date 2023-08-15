const NotesService = require('../services/NotesService')
const NotesService = new NotesService()
class NotesController {
  async getAllUserNotes(req, res) {
    const { userId } = req.user
    try {
      const Notes = await NotesService.getNotesByUserId(userId)
      res.json(Notes ?? {})
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve Notes for User' })
    }
  }

  async updateNote(req, res) {
    const noteId = req.body.noteId
    const NotesData = req.body
    try {
      await NotesService.updateNote(noteId, NotesData)
      res.json({ message: 'Note updated successfully' })
    } catch (error) {
      res.status(500).json({ message: 'Failed to update Note' })
    }
  }

  async getNoteById(req, res) {
    const noteId = req.body.noteId
    try {
      const Note = await NotesService.getNoteById(noteId)
      res.json(Note ?? {})
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch Note' })
    }
  }

  async createNewNote(req, res) {
    try {
      const { userId } = req.user
      const createdNote = await NotesService.createNote(userId, req.body)

      res.status(201).json(createdNote)
    } catch (error) {
      console.error('Error creating note:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async deleteNote(req, res) {
    const noteId = req.body.noteId
    try {
      await NotesService.deleteNote(noteId)
      res.json({ message: 'Note deleted successfully' })
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete Note' })
    }
  }
}

module.exports = NotesController
