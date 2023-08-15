const NotesService = require('../services/NotesService')
const NoteFactory = require('../factory/NoteFactory')
const notesService = new NotesService()
/**
 * The NotesController class handles requests related to notes.
 * It uses the NotesService to perform CRUD operations on notes.
 */
class NotesController {
  /**
   * Retrieves all notes for a user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} - The JSON response containing the user's notes.
   */
  async getAllUserNotes(req, res) {
    const { id } = req.user;
    logger.log(id)
    try {
      const Notes = await notesService.getNotesByUserId(id);
      res.json(Notes ?? {});
    } catch (error) {
      logger.error(error)
      res.status(500).json({ message: 'Failed to retrieve Notes for User' });
    }
  }

  /**
   * Updates a note.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} - The JSON response indicating the success of the update.
   */
  async updateNote(req, res) {
    const { id } = req.user;
    const noteId = req.params.noteId;
    const notesData = req.body;
    try {
      const note = await notesService.getNoteById(noteId);
      if (!note) {
        res.status(404).json({ message: 'Note not found' });
      } else {
        const updatedNote = await notesService.updateNote(note, notesData, id);
        res.json(updatedNote);
      }
    } catch (error) {
      logger.error(error)
      res.status(500).json({ message: 'Failed to update Note' });
    }
  }

  /**
   * Retrieves a note by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} - The JSON response containing the note.
   */
  async getNoteById(req, res) {
    const noteId = req.params.noteId;
    try {
      const Note = await notesService.getNoteById(noteId);
      if (!Note) {
        res.status(404).json({ message: 'Note not found' });
      } else {
        res.json(Note);
      }
    } catch (error) {
      logger.error(error)
      res.status(500).json({ message: 'Failed to fetch Note' });
    }
  }

  /**
   * Creates a new note.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} - The JSON response containing the created note.
   */
  async createNewNote(req, res) {
    try {
      const { id } = req.user;
      const { title, content, type } = req.body;
      const noteInstance = NoteFactory.createInstance(type)
      const createdNote = await noteInstance.create(id, { title, content });

      res.status(201).json(createdNote);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Deletes a note.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} - The JSON response indicating the success of the deletion.
   */
  async deleteNote(req, res) {
    const { id } = req.user;
    const noteId = req.params.noteId;
    try {
      await notesService.deleteNoteById(noteId, id);
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      logger.error(error)
      res.status(500).json({ message: 'Failed to delete Note' });
    }
  }
}

module.exports = NotesController
