const Notes = require('../models/notes')

class NotesRepository {
  async getNotesByUserId(userId) {
    return Notes.findAll({ where: { userId } })
  }

  async getNoteByNoteId(noteId) {
    return Notes.findByPk(noteId)
  }

  async createNewNote(userId, notesData) {
    return await Notes.create({
      userId,
      ...notesData
    })
  }

  async deleteNoteById(noteId) {
    return await Notes.destroy({ where: { id: noteId } })
  }

  async updateNote(noteId, notesData) {
    try {
      // Update the existing Note
      return await Notes.update(notesData, {
        where: { id: noteId }
      })
    } catch (error) {
      console.error('Error updating invoice to table:', error)
      throw error
    }
  }
}

module.exports = NotesRepository
