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

  async createNote (noteId, notesData) {
    return this.NotesRepository.createNewNote(noteId, notesData)
  }

  async updateNote (noteId, notesData) {
    return this.NotesRepository.updateNote(noteId, notesData)
  }

  async deleteNoteById (noteId) {
    return this.NotesRepository.deleteNoteById(noteId)
  }
}

module.exports = NotesService
