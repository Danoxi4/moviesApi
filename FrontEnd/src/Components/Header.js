import React from 'react';
import { HeaderContainer, Avatar, LogoutButton } from '../styles/loginHeaderStyle'


const Header = ({ avatarUrl, onLogout }) => {
    return (
      <HeaderContainer>
        <Avatar src={avatarUrl} alt="User Avatar" />
        <LogoutButton onClick={onLogout}>Logout</LogoutButton>
      </HeaderContainer>
    );
  };
  
  export default Header;