import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import BookCard from '../components/Bookcard';
import Pagination from '../components/Pagination';

export default function BookList() {
  const [booksData, setBooksData] = useState({books:[], total:0, page:1, pages:1});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get(`/books?page=${page}`);
      setBooksData(res.data);
    };
    fetchBooks();
  }, [page]);

  return (
    <div>
      <h2>Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {booksData.books.map(b => <BookCard key={b._id} book={b} />)}
      </div>
      <Pagination page={booksData.page} pages={booksData.pages} onChange={setPage} />
    </div>
  );
}
