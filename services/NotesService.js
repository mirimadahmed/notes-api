const NotesRepository = require('../repositories/NotesRepository')

class NotesService {
  constructor () {
    this.NotesRepository = new NotesRepository()
  }

  async getNotesByUserId (userId) {
    return this.NotesRepository.getNotesByUserId(userId)
  }

  async getNoteById (noteId) {
    return this.NotesRepository.getNoteByNoteId(noteId)
  }

  async createNote (userId, notesData) {
    return this.NotesRepository.createNewNote(userId, notesData)
  }

  async updateNote (note, notesData, userId) {
    return this.NotesRepository.updateNote(note, notesData, userId)
  }

  async deleteNoteById (noteId, userId) {
    return this.NotesRepository.deleteNoteById(noteId, userId)
  }
}

module.exports = NotesService
