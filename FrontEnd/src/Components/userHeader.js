import React from 'react';
import { HeaderContainer, LogoutButton, Spacer } from '../styles/loginHeaderStyle'
import Avatar from '../Components/avatar'

const Header = ({ avatarUrl, onLogout }) => {

  console.log(avatarUrl)
  
    return (
      <HeaderContainer>
        <Avatar name={avatarUrl} alt="User Avatar" />
        <Spacer/>
        <LogoutButton onClick={onLogout}>Logout</LogoutButton>
      </HeaderContainer>
    );
  };
  
  export default Header;