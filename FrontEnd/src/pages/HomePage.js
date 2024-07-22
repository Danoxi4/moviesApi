// src/pages/HomePage.js

import React, { useEffect, useState } from 'react';
import IntroSection from '../Components/introSection';
import MovieSection from '../Components/movieSection';
import ContactSection from '../Components/contactSection';
import { HomePageContainer } from '../styles/HomePageStyle'

const HomePage = () => {
  const [newestMovie, setNewestMovie] = useState(null);

  useEffect(() => {
    // Fetch the newest movie from the API
    fetch('http://localhost:5000/api/movies/newest')
      .then(response => response.json())
      .then(data => setNewestMovie(data))
      .catch(error => console.error('Error fetching the newest movie:', error));
  }, []);

  return (
    <HomePageContainer>
      <IntroSection />
      <MovieSection movie={newestMovie} />
      <ContactSection />
    </HomePageContainer>
  );
};

export default HomePage;
