import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import DashboardHome from './Pages/DashboardHome';
import Users from './Pages/User';
import Movies from './Pages/Movies';
import AddMovie from './Pages/AddMovie';
import Analytics from './Pages/Analytics';
import LoginPage from './Components/login';
import ProtectedRoute from './protectedRoute';
import { AuthProvider } from './AuthContext';
import './styles/App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route 
            path="/dashboard" 
            element={
              // <ProtectedRoute>
                <Layout />
              // </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="users" element={<Users />} />
            <Route path="movies" element={<Movies />} />
            <Route path="add-movie" element={<AddMovie />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
