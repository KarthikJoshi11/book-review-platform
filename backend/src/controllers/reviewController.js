const Review = require('../models/Review');
const Book = require('../models/Book');

const addOrUpdateReview = async (req, res) => {
  try {
    const { bookId, rating, reviewText } = req.body;
    // ensure book exists
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // upsert: if user already reviewed, update; else create
    const review = await Review.findOneAndUpdate(
      { bookId, userId: req.user._id },
      { rating, reviewText },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (!review.userId.equals(req.user._id)) return res.status(403).json({ message: 'Not authorized' });

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addOrUpdateReview, deleteReview };
