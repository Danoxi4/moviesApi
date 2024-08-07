import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import DashboardHome from './Pages/DashboardHome';
import Users from './Pages/User';
import Movies from './Pages/Movies';
import AddMovie from './Pages/AddMovie';
import AnalyticsPage from './Pages/Analytics';
import LoginPage from './Components/login';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import './styles/App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Dashboard" element={<Layout />}>
            <Route index element={<DashboardHome />} />
            <Route path="/Dashboard/users" element={<Users />} />
            <Route path="/Dashboard/movies" element={<Movies />} />
            <Route path="/Dashboard/add-movie" element={<AddMovie />} />
            <Route path="/Dashboard/analytics" element={<AnalyticsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
