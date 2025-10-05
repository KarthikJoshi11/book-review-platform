require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/reviews', require('./routes/reviews'));

// error handler (simple)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
