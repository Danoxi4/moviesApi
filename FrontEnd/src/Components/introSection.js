import React from 'react';
import Nav from './nav'; // Adjust path as per your file structure
import {  Section,
          IntroText,
          Spotlight,
          Popcorn } from '../styles/introSectionStyle'

const IntroSection = () => (
  <Section>
    <Nav />
    <IntroText>
      <h1>Welcome to MovieLand</h1>
      <p>Your one-stop destination for the latest movies and reviews.</p>
    </IntroText>
    <Spotlight />
    <Popcorn />
    <Popcorn />
    <Popcorn />
    {/* Add more Popcorn components for more popcorn */}
  </Section>
);

export default IntroSection;