import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalBackground, ModalContent, ButtonRow, LinkButton, TabButton, Form } from '../styles/authModalStyle';

const AuthModal = ({ onClose, initialTab }) => {
  const [isSignIn, setIsSignIn] = useState(initialTab === 'signIn');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
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

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Sign in success:', data);
      onClose();
      navigate('/user-page');
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
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
      onClose();
    } catch (error) {
      console.error('Sign up error:', error);
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
