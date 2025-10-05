const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addOrUpdateReview, deleteReview } = require('../controllers/reviewController');

router.post('/', auth, addOrUpdateReview); // add or update user review
router.delete('/:id', auth, deleteReview);

module.exports = router;
