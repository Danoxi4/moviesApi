import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Side-bar';
import Header from './Components/Header';
import DashboardHome from './Pages/DashboardHome';
import Users from './Pages/User';
import Movies from './Pages/Movies';
import AddMovie from './Pages/AddMovie';
import Analytics from './Pages/Analytics';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/users" element={<Users />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/add-movie" element={<AddMovie />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}


export default App;