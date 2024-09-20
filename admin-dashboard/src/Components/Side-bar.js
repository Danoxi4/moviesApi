import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../styles/sideBar.css'; // Import the CSS module

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
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
        <li>
          <Link to="/dashboard/reviews">Reviews</Link>
        </li>
        <li>
          <Link to="/dashboard/register">Register</Link>
        </li>

      </ul>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
