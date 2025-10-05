import React, { useState, useContext } from 'react';
import axios from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';

export default function ReviewForm({ bookId, onSuccess, initialReview }) {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(initialReview?.rating || 5);
  const [reviewText, setReviewText] = useState(initialReview?.reviewText || '');

  const submit = async e => {
    e.preventDefault();
    try {
      await axios.post('/reviews', { bookId, rating, reviewText });
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not save review');
    }
  };

  return (
    <form onSubmit={submit}>
      <label>Rating</label>
      <select value={rating} onChange={e => setRating(Number(e.target.value))}>
        {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} stars</option>)}
      </select>
      <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Write review..." />
      <button type="submit">{initialReview ? 'Update Review' : 'Add Review'}</button>
    </form>
  );
}
