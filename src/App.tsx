import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { useEffect, useState } from 'react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('admin_session') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('admin_session', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_session');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={
          isAuthenticated ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={handleLogin} />
        } />
        <Route path="/admin/dashboard" element={
          isAuthenticated ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/admin" />
        } />
      </Routes>
    </Router>
  );
}
