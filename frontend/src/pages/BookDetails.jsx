import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axiosInstance';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ReviewForm from '../components/ReviewForm';

export default function BookDetails() {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchDetails = async () => {
    const res = await axios.get(`/books/${id}`);
    setBookInfo(res.data);
  };

  useEffect(() => { fetchDetails(); }, [id]);

  if (!bookInfo) return <div>Loading...</div>;

  return (
    <div>
      <h1>{bookInfo.book.title}</h1>
      <p>By: {bookInfo.book.author}</p>
      <p>{bookInfo.book.description}</p>
      <p>Average rating: {bookInfo.avgRating} ({bookInfo.reviews.length} reviews)</p>

      {user ? <ReviewForm bookId={id} onSuccess={fetchDetails} initialReview={bookInfo.reviews.find(r => r.userId._id === user.id)} /> : <p>Login to add review</p>}

      <div>
        <h3>Reviews</h3>
        {bookInfo.reviews.map(r => (
          <div key={r._id}>
            <strong>{r.userId.name}</strong>
            <span> — {r.rating} stars</span>
            <p>{r.reviewText}</p>
            {/* Optionally show edit/delete buttons for own reviews */}
          </div>
        ))}
      </div>
    </div>
  );
}
