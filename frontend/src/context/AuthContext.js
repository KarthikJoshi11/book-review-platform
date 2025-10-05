import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [token, user]);

  const login = (token, user) => { setToken(token); setUser(user); };
  const logout = () => { setToken(null); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, axios }}>
      {children}
    </AuthContext.Provider>
  );
};
