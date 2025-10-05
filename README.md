# Book Review Platform (MERN)

## Features
- User signup/login with JWT
- Add/edit/delete books (only creator)
- Add/update/delete reviews (only author)
- Pagination (5 books per page)
- Search (q), filter (genre, addedBy), basic sorting
- Frontend using React Router, Context API, Axios

## Tech Stack
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- Frontend: React 18, React Router v6, Axios

## Prerequisites
- Node.js 18+
- MongoDB Atlas connection string

## Setup (Backend)
1. `cd backend`
2. Create `.env` with:
```
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=5000
```
3. Install deps: `npm install`
4. Run dev: `npm run dev`

## Setup (Frontend)
1. `cd frontend`
2. Install deps: `npm install`
3. Create `.env` with:
```
VITE_API_URL=http://localhost:5000/api
```
4. Start dev server (Vite or your setup): `npm run dev`

## API Documentation
Base URL: `/api`

### Auth
- POST `/auth/signup`
  - body: `{ name, email, password }`
  - 201: `{ token, user: { id, name, email } }`
- POST `/auth/login`
  - body: `{ email, password }`
  - 200: `{ token, user: { id, name, email } }`

Authorization: Include header `Authorization: Bearer <token>` for protected routes.

### Books
- GET `/books`
  - query:
    - `page` (default 1, 5 per page)
    - `q` full-text search on title/author/description
    - `genre` exact match
    - `addedBy` filter by user id (owner)
    - `sort` one of: `year_asc` (default is createdAt desc)
  - 200: `{ books: Book[], total, page, pages }`
- POST `/books` (auth)
  - body: `{ title, author, description?, genre?, year? }`
  - 201: `Book`
- GET `/books/:id`
  - 200: `{ book, reviews, avgRating }`
- PUT `/books/:id` (auth, only owner)
  - body: any of `{ title, author, description, genre, year }`
  - 200: `Book`
- DELETE `/books/:id` (auth, only owner)
  - 200: `{ message: 'Book deleted' }`

### Reviews
- POST `/reviews` (auth)
  - upsert current user's review for a book
  - body: `{ bookId, rating (1-5), reviewText? }`
  - 200: `Review`
- DELETE `/reviews/:id` (auth, only author)
  - 200: `{ message: 'Review deleted' }`

## Frontend Pages
- `Signup` `/signup`
- `Login` `/login`
- `BookList` `/` with pagination
- `BookDetails` `/book/:id` with reviews and average rating
- `AddEditBook` `/add` and `/edit/:id` (protected)
- `Profile` `/profile` shows current user's books

## Notes
- Text index is created on `Book` for full-text search (title, author, description).
- Pagination fixed at 5 items per page as per assignment.
- Token and user are persisted in `localStorage` via `AuthContext`.
