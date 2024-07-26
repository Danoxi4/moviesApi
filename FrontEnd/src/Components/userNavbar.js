import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hook/useAuthContext'; // Adjust the path as necessary
import { Navbar, NavLink } from '../styles/userLandingPageStyle';

const UserNavbar = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login'); // Redirect to login page
  };

  return (
    <Navbar>
      <NavLink href="/movies">Movies</NavLink>
      <NavLink href="/favorites">Favorites</NavLink>
      <NavLink href="/watchlist">Watchlist</NavLink>
      <NavLink href="#" onClick={handleLogout}>Logout</NavLink>
    </Navbar>
  );
};

export default UserNavbar;
