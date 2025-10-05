import React, { useState, useContext } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/auth/login', form);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-4 flex flex-col gap-2">
      <h2 className="text-xl font-semibold mb-2">Login</h2>
      <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" type="email" required />
      <input value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" type="password" required />
      <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      <p className="text-sm">No account? <Link to="/signup" className="underline">Create one</Link></p>
    </form>
  );
}

