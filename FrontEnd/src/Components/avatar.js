import React from 'react';
import { AvatarContainer } from '../styles/avatarStyle';
// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


const Avatar = ({ name }) => {
  // Get the first letter of the user's name
  const initial = name ? name.charAt(0) : '?';
  // Generate a random color for the background
  const bgColor = getRandomColor();

  return (
    <AvatarContainer bgColor={bgColor}>
      {initial}
    </AvatarContainer>
  );
};

export default Avatar;
