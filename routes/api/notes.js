const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


router.post('/', ensureLoggedIn, notesCtrl.createNote);

router.get('/', ensureLoggedIn, notesCtrl.getAllNotes);

module.exports = router;