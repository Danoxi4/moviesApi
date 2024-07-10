// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
//import Header from './Components/Header';
import HomePage from './pages/HomePage';
import SignInPage from './pages/signInPage';
import LoginPage from './pages/logInPage';
import { AppProvider } from './contexts/appContext';
import Nav from './Components/nav';

const App = () => {
  return (
    <Router>
      <AppProvider>
        <GlobalStyle />
        <Nav/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Add other routes here if needed */}
        </Routes>
      </AppProvider>
    </Router>
  );
};

export default App;
