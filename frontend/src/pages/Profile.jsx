import React, { useContext, useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import BookCard from '../components/Bookcard';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({ books: [], page: 1, pages: 1, total: 0 });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const run = async () => {
      const res = await axios.get(`/books?page=${page}&addedBy=${user.id}`);
      setData(res.data);
    };
    run();
  }, [page, user]);

  const handleDeleted = (id) => {
    setData(prev => ({ ...prev, books: prev.books.filter(b => b._id !== id) }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{user.name}'s Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.books.map(b => (
          <BookCard key={b._id} book={b} onDeleted={handleDeleted} />
        ))}
      </div>
    </div>
  );
}

