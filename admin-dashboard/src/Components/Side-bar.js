import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sideBar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/add-movie">Add Movie</Link></li>
          <li><Link to="/analytics">Analytics</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
