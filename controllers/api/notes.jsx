const Note = require('../../models/notes');

module.exports = {
  createNote,
  getAllNotes
};

async function createNote(req, res) {
  try {
    const { text } = req.body;
    const newNote = await Note.create({ text, user: req.user._id });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}

async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}
