const Notes = require('../models/notes')

class NotesRepository {
  async getNotesByUserId(userId) {
    return Notes.findAll({ where: { userId } })
  }

  async getNoteByNoteId(noteId) {
    return Notes.findByPk(noteId)
  }

  async createNewNote(userId, NotesData) {
    return await Notes.create({
      userId,
      ...NotesData
    })
  }

  async deleteNoteById(noteId) {
    return await Notes.destroy({ where: { id: noteId } })
  }

  async updateNote(noteId, NotesData) {
    try {
      // Update the existing Notes
      return await Notes.update(NotesData, {
        where: { id: noteId }
      })
    } catch (error) {
      console.error('Error updating invoice to table:', error)
      throw error
    }
  }
}

module.exports = NotesRepository
