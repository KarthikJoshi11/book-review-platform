const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addBook, editBook, deleteBook, getBooks, getBookDetails } = require('../controllers/bookController');

router.get('/', getBooks);
router.post('/', auth, addBook);
router.get('/:id', getBookDetails);
router.put('/:id', auth, editBook);
router.delete('/:id', auth, deleteBook);

module.exports = router;
