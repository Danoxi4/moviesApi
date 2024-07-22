import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, LogoutButton, NavItem, NavbarContainer, Nav } from '../../Styles/dashboardStyles/navStyle'


const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/login');
  };

  return (
    <NavbarContainer>
      <Nav>
        <NavItem to="/admin/users">View Users</NavItem>
        <NavItem to="/admin/movies">View Movies</NavItem>
        <NavItem to="/admin/add-movie">Add Movie</NavItem>
        <NavItem to="/admin/update-movie">Update Movie</NavItem>
        <NavItem to="/admin/delete-movie">Delete Movie</NavItem>
        <NavItem to="/admin/analytics">Analytics</NavItem>
      </Nav>
      <Nav>
        <Avatar>A</Avatar>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Nav>
    </NavbarContainer>
  );
};

export default AdminNavbar;
