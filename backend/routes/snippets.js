const express = require('express');
const router = express.Router();
const snippetsController = require('../controllers/snippetsController');

router.get('/', snippetsController.getAllSnippets);
router.post('/', snippetsController.createSnippet);
router.get('/:id', snippetsController.getSnippetById);
router.put('/:id', snippetsController.updateSnippet);
router.delete('/:id', snippetsController.deleteSnippet);

module.exports = router;
