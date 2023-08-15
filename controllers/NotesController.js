const NotesService = require('../services/NotesService')
const NotesService = new NotesService()
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
    const { userId } = req.user;
    try {
      const Notes = await NotesService.getNotesByUserId(userId);
      res.json(Notes ?? {});
    } catch (error) {
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
    const noteId = req.params.noteId;
    const NotesData = req.body;
    try {
      await NotesService.updateNote(noteId, NotesData);
      res.json({ message: 'Note updated successfully' });
    } catch (error) {
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
      const Note = await NotesService.getNoteById(noteId);
      if (!Note) {
        res.status(404).json({ message: 'Note not found' });
      } else {
        res.json(Note);
      }
    } catch (error) {
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
      const { userId } = req.user;
      const { title, content, type } = req.body;
      const createdNote = await NotesService.createNote(userId, { title, content, type });

      res.status(201).json(createdNote);
    } catch (error) {
      console.error('Error creating note:', error);
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
    const noteId = req.params.noteId;
    try {
      await NotesService.deleteNote(noteId);
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete Note' });
    }
  }
}

module.exports = NotesController
