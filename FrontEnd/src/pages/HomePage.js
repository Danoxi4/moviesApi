// src/pages/HomePage.js

import React, { useEffect, useState } from 'react';
import IntroSection from '../Components/introSection';
import MovieSection from '../Components/movieSection';
import ContactSection from '../Components/contactSection';
import { HomePageContainer } from '../styles/HomePageStyle'
import AboutUs from '../Components/aboutUs'

const HomePage = () => {

  return (
    <HomePageContainer>
      <IntroSection id="intro" />
      <MovieSection id="movie" />
      <AboutUs id="about" />
      <ContactSection id="contact" />
    </HomePageContainer>
  );
};

export default HomePage;
