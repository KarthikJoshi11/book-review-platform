import React, { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddEditBook() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:'', author:'', description:'', genre:'', year:'' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      axios.get(`/books/${id}`).then(res => {
        const b = res.data.book;
        setForm({
          title: b.title || '',
          author: b.author || '',
          description: b.description || '',
          genre: b.genre || '',
          year: b.year || ''
        });
      }).catch(() => {});
    }
  }, [id, isEdit]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, year: form.year ? Number(form.year) : undefined };
      if (isEdit) await axios.put(`/books/${id}`, payload);
      else await axios.post('/books', payload);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-lg mx-auto p-4 flex flex-col gap-2">
      <h2 className="text-xl font-semibold mb-2">{isEdit ? 'Edit Book' : 'Add Book'}</h2>
      <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" required />
      <input value={form.author} onChange={e=>setForm({...form, author:e.target.value})} placeholder="Author" required />
      <input value={form.genre} onChange={e=>setForm({...form, genre:e.target.value})} placeholder="Genre" />
      <input value={form.year} onChange={e=>setForm({...form, year:e.target.value})} placeholder="Published Year" type="number" />
      <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" rows={5} />
      <button type="submit" disabled={loading}>{loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}</button>
    </form>
  );
}

