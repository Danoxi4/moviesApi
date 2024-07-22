import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './Pages/AdminDashboard/Dashboard';
import Users from './Pages/AdminDashboard/Users';
import Movies from './Pages/AdminDashboard/Movies';
import AddMovie from './Pages/AdminDashboard/AddMovie';
import UpdateMovie from './Pages/AdminDashboard/UpdateMovie';
// import DeleteMovie from './Pages/AdminDashboard';
import Analytics from './Pages/AdminDashboard/Analytics';
// import Home from './pages/Home'; // Your existing home page component
// import Login from './pages/Login'; // Your existing login page component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="users" element={<Users />} />
          <Route path="movies" element={<Movies />} />
          <Route path="add-movie" element={<AddMovie />} />
          <Route path="update-movie" element={<UpdateMovie />} />
          {/* <Route path="delete-movie" element={<DeleteMovie />} /> */}
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
