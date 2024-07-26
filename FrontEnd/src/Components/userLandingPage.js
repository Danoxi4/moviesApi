import React from 'react';
import UserNavbar from './userNavbar';
import { LandingPageContainer } from '../styles/userLandingPageStyle';

const UserLandingPage = () => {
  return (
    <LandingPageContainer>
      <UserNavbar />
      <div className="content">
        <h1>Welcome to Your Dashboard</h1>
        <p>Select an option from the navbar to manage your movies, favorites, and watchlist.</p>
      </div>
    </LandingPageContainer>
  );
};

export default UserLandingPage;
