import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sideBar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
        <li>
          <Link to="/dashboard">Home</Link>
        </li>
        <li>
          <Link to="/dashboard/users">Users</Link>
        </li>
        <li>
          <Link to="/dashboard/movies">Movies</Link>
        </li>
        <li>
          <Link to="/dashboard/add-movie">Add Movie</Link>
        </li>
        <li>
          <Link to="/dashboard/analytics">Analytics</Link>
        </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
