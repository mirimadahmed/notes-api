const NoteService = require('../services/NotesService')
class Note {
    constructor(type) {
        this.type = type
    }

    async create(userId, { title, content }) {
        const noteService = new NoteService()
        return await noteService.createNote(userId, { title, content, type: this.type });
    }
}

module.exports = Note;