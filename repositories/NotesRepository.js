const Notes = require('../models/notes')
const RedisClient = require('../utils/cache')

class NotesRepository {
  async getNotesByUserId(userId) {
    // Before querying the DB
    const cachedNotes = await RedisClient.client.get(`notes:${userId}`);
    if (cachedNotes) {
      return JSON.parse(cachedNotes);
    } else {
      const notes = Notes.findAll({ where: { userId } })
      // If not cached, query DB then:
      await RedisClient.client.setEx(`notes:${userId}`, 3600, JSON.stringify(notes)); // Cache for 1 hour
      return notes
    }
  }

  async getNoteByNoteId(noteId) {
    return Notes.findByPk(noteId)
  }

  async createNewNote(userId, notesData) {
    await RedisClient.client.del(`notes:${userId}`);
    return await Notes.create({
      userId,
      ...notesData
    })
  }

  async deleteNoteById(noteId, userId) {
    await RedisClient.client.del(`notes:${userId}`);
    return await Notes.destroy({ where: { id: noteId } })
  }

  async updateNote(note, notesData, userId) {
    try {
      const updatedNote = await note.update(notesData)
      await RedisClient.client.del(`notes:${userId}`);
      return updatedNote
    } catch (error) {
      logger.error(error)
      throw error
    }
  }
}

module.exports = NotesRepository
