import React from 'react';
import { HeaderContainer, BrandName, SearchBox } from '../styles/moviesHeaderStyle';
const Header = () => {
    return (
      <HeaderContainer>
        <BrandName>MovieLand</BrandName>
        <SearchBox type="text" placeholder="Search movies..." />
      </HeaderContainer>
    );
  };
  
  export default Header;