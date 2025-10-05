const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  author: { type: String, required: true, index: true },
  description: { type: String },
  genre: { type: String, index: true },
  year: { type: Number },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Optionally add text index for searching title/author/description
bookSchema.index({ title: 'text', author: 'text', description: 'text' });

module.exports = mongoose.model('Book', bookSchema);
