import React, { useState, useContext } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Signup() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/signup', form);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) { alert(err.response?.data?.message || 'Signup failed'); }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-4">
      <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" required />
      <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" type="email" required />
      <input value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" type="password" required />
      <button type="submit">Sign up</button>
    </form>
  );
}
