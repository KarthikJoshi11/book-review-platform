import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddEditBook from './pages/AddEditBook';
import Profile from './pages/Profile';
import { AuthContext } from './context/AuthContext';

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <Link to="/">Home</Link>
      <div className="flex gap-3 items-center">
        {user ? (
          <>
            <Link to="/add">Add Book</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="p-4 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<RequireAuth><AddEditBook /></RequireAuth>} />
          <Route path="/edit/:id" element={<RequireAuth><AddEditBook /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

