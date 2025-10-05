import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';

export default function BookCard({ book, onDeleted }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const isOwner = user && book.addedBy && (book.addedBy._id ? book.addedBy._id === user.id : book.addedBy === user.id);

  const handleDelete = async () => {
    if (!window.confirm('Delete this book?')) return;
    setDeleting(true);
    try {
      await axios.delete(`/books/${book._id}`);
      onDeleted && onDeleted(book._id);
    } catch (e) {
      alert(e.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="border p-3 rounded">
      <Link to={`/book/${book._id}`} className="text-lg font-semibold">{book.title}</Link>
      <p className="text-sm">By {book.author}</p>
      {book.genre && <p className="text-sm">Genre: {book.genre}</p>}
      {typeof book.year === 'number' && <p className="text-sm">Year: {book.year}</p>}
      <div className="mt-2 flex gap-2">
        <Link to={`/book/${book._id}`} className="underline">Details</Link>
        {isOwner && (
          <>
            <button onClick={() => navigate(`/edit/${book._id}`)} className="underline">Edit</button>
            <button onClick={handleDelete} disabled={deleting} className="underline">{deleting ? 'Deleting...' : 'Delete'}</button>
          </>
        )}
      </div>
    </div>
  );
}

