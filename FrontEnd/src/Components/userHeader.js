import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hook/useAuthContext'; // Adjust the path as necessary
import Avatar from '../Components/avatar';
import axios from 'axios';
import { HeaderContainer, LogoutButton, Navbar, NavLink, Spacer, MidSpacer, BigSpacer,Logo } from '../styles/loginHeaderStyle'; // Import styles

const Header = ({ avatarUrl }) => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleLogout = () => {
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: 'LOGOUT' });
    navigate('/'); // Redirect to login page
  };

  const goToFavorites = () => {
    navigate('/favorites');
  };

  const goToWatchlist = () => {
    navigate('/watchlist');
  };

  const goToMovies = () => { 
    navigate('/movies');
  }

  return (
    <HeaderContainer>
      <Navbar>
      <Logo>MovieLand</Logo>
        <MidSpacer />
        <NavLink onClick={goToMovies}>Movies</NavLink>
        <MidSpacer />
        <NavLink onClick={goToFavorites}>Favorites</NavLink>
        <MidSpacer />
        <NavLink onClick={goToWatchlist}>Watchlist</NavLink>
        <BigSpacer/>
        <Avatar name={avatarUrl} alt="User Avatar" />
        <Spacer/>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Navbar>
    </HeaderContainer>
  );
};

export default Header;
