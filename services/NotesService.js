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

  async createNote (noteId, NotesData) {
    return this.NotesRepository.createNewNote(noteId, NotesData)
  }

  async updateNote (noteId, NotesData) {
    return this.NotesRepository.updateNote(noteId, NotesData)
  }

  async deleteNoteById (noteId) {
    return this.NotesRepository.deleteNoteById(noteId)
  }
}

module.exports = NotesService
