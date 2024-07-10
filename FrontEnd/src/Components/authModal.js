import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #041D56; /* Dark blue background */
  color: #ADE1FB; /* Light blue text */
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const LinkButton = styled.a`
  background: #266CA9; /* Medium blue background */
  color: #ADE1FB; /* Light blue text */
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px; /* Rounded corners */
  cursor: pointer;
  transition: background 0.3s;
  text-decoration: none;

  &:hover {
    background: #0F2573; /* Darker blue background */
  }
`;

const TabButton = styled.button`
  background: ${({ active }) => (active ? '#266CA9' : '#0F2573')}; /* Conditional background color */
  color: #ADE1FB; /* Light blue text */
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 0.5rem;
  transition: background 0.3s;

  &:hover {
    background: #041D56; /* Dark blue background */
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  input, select {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #266CA9; /* Medium blue border */
    width: 100%;
    background: #041D56; /* Match modal background */
    color: #ADE1FB; /* Light blue text */
  }
`;

const AuthModal = ({ onClose, initialTab }) => {
  const [isSignIn, setIsSignIn] = useState(initialTab === 'signIn');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [favoriteGenre, setFavoriteGenre] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    // Implement sign in logic here
    try {
      // Example fetch call to your backend
      const response = await fetch('http://localhost:1989/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword,
        }),
      });
      const data = await response.json();
      console.log('Sign in success:', data);
      // Close modal or handle success as needed
      onClose();
    } catch (error) {
      console.error('Sign in error:', error);
      // Handle error state or display error message
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Implement sign up logic here
    try {
      // Example fetch call to your backend
      const response = await fetch('http://localhost:1989/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signUpUsername,
          email: signUpEmail,
          password: signUpPassword,
          favoriteGenre: favoriteGenre,
        }),
      });
      const data = await response.json();
      console.log('Sign up success:', data);
      // Close modal or handle success as needed
      onClose();
    } catch (error) {
      console.error('Sign up error:', error);
      // Handle error state or display error message
    }
  };

  const handleTabChange = (tab) => {
    if (tab === 'signIn') {
      setSignInEmail('');
      setSignInPassword('');
    } else {
      setSignUpUsername('');
      setSignUpEmail('');
      setSignUpPassword('');
      setFavoriteGenre('');
    }
    setIsSignIn(tab === 'signIn');
  };

  return (
    <ModalBackground>
      <ModalContent>
        <div>
          <TabButton active={isSignIn} onClick={() => handleTabChange('signIn')}>Sign In</TabButton>
          <TabButton active={!isSignIn} onClick={() => handleTabChange('signUp')}>Sign Up</TabButton>
        </div>
        {isSignIn ? (
          <Form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              required
            />
            <ButtonRow style={{ justifyContent: 'space-between' }}>
              <LinkButton href="#" onClick={handleSignIn} style={{ marginRight: 20 }}>Sign In</LinkButton>
              <LinkButton href="#" onClick={onClose} style={{ marginLeft: 20 }}>Close</LinkButton>
            </ButtonRow>
          </Form>
        ) : (
          <Form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Username"
              value={signUpUsername}
              onChange={(e) => setSignUpUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              required
            />
            <select
              value={favoriteGenre}
              onChange={(e) => setFavoriteGenre(e.target.value)}
              required
            >
              <option value="" disabled>Select Favorite Genre</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="horror">Horror</option>
              <option value="sci-fi">Sci-Fi</option>
            </select>
            <ButtonRow style={{ justifyContent: 'space-between' }}>
              <LinkButton href="#" onClick={handleSignUp} style={{ marginRight: 20 }}>Sign Up</LinkButton>
              <LinkButton href="#" onClick={onClose} style={{ marginLeft: 20 }}>Close</LinkButton>
            </ButtonRow>
          </Form>
        )}
      </ModalContent>
    </ModalBackground>
  );
};

export default AuthModal;
