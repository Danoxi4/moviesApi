import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // Role can be 'admin' or 'regular'
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and their role
    const checkAuth = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role) {
        setIsLoggedIn(true);
        setRole(user.role);
        // Optionally navigate if already logged in
        // navigate('/dashboard');
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setRole(userData.role);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setRole(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
