const Book = require('../models/Book');
const Review = require('../models/Review');

const addBook = async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;
    const book = new Book({ title, author, description, genre, year, addedBy: req.user._id });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const editBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (!book.addedBy.equals(req.user._id)) return res.status(403).json({ message: 'Not authorized' });

    const updates = ['title','author','description','genre','year'];
    updates.forEach(u => {
      if (req.body[u] !== undefined) book[u] = req.body[u];
    });
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (!book.addedBy.equals(req.user._id)) return res.status(403).json({ message: 'Not authorized' });
    await Review.deleteMany({ bookId: book._id });
    await book.deleteOne();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get books with pagination & optional search/filter/sort
const getBooks = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = 5;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.genre) filter.genre = req.query.genre;
    if (req.query.addedBy) filter.addedBy = req.query.addedBy; // filter by owner
    if (req.query.q) {
      filter.$text = { $search: req.query.q }; // uses text index
    }

    let sort = { createdAt: -1 };
    if (req.query.sort === 'year_asc') sort = { year: 1 };
    if (req.query.sort === 'rating_desc') {
      // sorting by average rating will be handled client-side or by aggregation (advanced)
      sort = { createdAt: -1 };
    }

    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter).sort(sort).skip(skip).limit(limit).lean();
    res.json({ books, total, page, pages: Math.ceil(total/limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get book details with reviews and average rating
const getBookDetails = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId).populate('addedBy', 'name email').lean();
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // fetch reviews and compute average rating
    const reviews = await Review.find({ bookId }).populate('userId', 'name').sort({ createdAt: -1 }).lean();
    const avgRating = reviews.length ? (reviews.reduce((s,r)=>s+r.rating,0) / reviews.length) : 0;

    res.json({ book, reviews, avgRating: Number(avgRating.toFixed(2)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addBook, editBook, deleteBook, getBooks, getBookDetails };
