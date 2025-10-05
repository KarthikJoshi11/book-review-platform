const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String }
}, { timestamps: true });

// Ensure one user can only leave one review per book (optional)
reviewSchema.index({ bookId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
