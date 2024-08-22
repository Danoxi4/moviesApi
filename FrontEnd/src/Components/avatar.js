import React from 'react';
import { AvatarContainer } from '../styles/avatarStyle';

// Function to generate a random color
const getRandomColor = () => {
  const h = Math.random() * 360; // Random hue
  const s = Math.random() * 0.5 + 0.5; // Random saturation (at least 50%)
  const l = Math.random() * 0.3 + 0.2; // Random lightness (between 20% and 50%)

  const color = `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
  return color;
};


const Avatar = ({ name }) => {
  // Get the first letter of the user's name
  const initial = name ? name.charAt(0) : '?';
  // Generate a random color for the background
  const bgColor = getRandomColor();

console.log("Avatar letter", initial)
console.log(name)
  return (
    <AvatarContainer bgColor={bgColor}>
      {initial}
    </AvatarContainer>
  );
};

export default Avatar;