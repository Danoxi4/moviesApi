// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
//import Header from './Components/Header';
import HomePage from './pages/HomePage';

import { AppProvider } from './contexts/appContext';
import { useAuthContext } from './Hook/useAuthContext';
import { AuthContextProvider } from './Context/AuthContext';
import Nav from './Components/nav';
import UserLandingPage from './pages/userLandingPage';
import ProtectedRoute from './Components/ProtectedRoute';
import LoginPage from './pages/logInPage';

import AboutUs from './Components/aboutUs'
import FavoritesPage from './pages/favorites';
import WatchlistPage from './pages/watchListPage';
import MoviesPage from './pages/moviesPage';
import ResetPassword from './pages/resetPasswordPage'
import SingleMoviePage from './pages/singleMovie';

const ConditionalNav = () => {
  const location = useLocation();
  const excludeNavPaths = [ 
    '/user-page',
    '/favorites',
    '/watchlist',
    '/movies',
    "/reset-password",
    "/movie/:id"
  ];

  if (excludeNavPaths.includes(location.pathname)) {
    return null; // Don't render the navbar
  }

  return <Nav />;
};

const App = () => {
  return (
    <Router>
      <AppProvider>
      <AuthContextProvider>
      <useAuthContext>
        <GlobalStyle />
        <ConditionalNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/user-page"
            element={
              <ProtectedRoute>
                <UserLandingPage />
              </ProtectedRoute>
            }
          />   
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <WatchlistPage />
              </ProtectedRoute>
            }
          />
          <Route path="/about-us" element={<AboutUs />} /> {/* New route for About Us */}
                    {/* Add other routes here if needed */}
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/movie/:id" element={<SingleMoviePage />} />
        </Routes>
      </useAuthContext>
      </AuthContextProvider>
      </AppProvider>
    </Router>
  );
};

export default App