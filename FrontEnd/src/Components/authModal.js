import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalBackground, ModalContent, ButtonRow, LinkButton, TabButton, Form, ForgotPasswordLink } from '../styles/authModalStyle';
import { useAuthContext } from '../Hook/useAuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AuthModal = ({ onClose, initialTab }) => {
  const [isSignIn, setIsSignIn] = useState(initialTab === 'signIn');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const { dispatch } = useAuthContext(); // Obtain dispatch from context
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(); // Call the onClose function passed as a prop
  };

  const handleSignIn = async (e) => {
  e.preventDefault();
  try {
    console.log('Signing in');
    const response = await axios.post('http://localhost:1989/api/users/login', {
      email: signInEmail,
      password: signInPassword,
      credentials: 'included',
    });

    const data = response.data;
    console.log('Sign in success:', data);

    if (response.status === 200) {
      dispatch({ type: 'LOGIN', payload: { email: signInEmail, token: data.token, username: data.username } });
    
      localStorage.setItem('user', JSON.stringify({ email: signInEmail, token: data.token, username: data.username }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      onClose();
      navigate('/user-page');
    }
    else {
      console.error('Sign in error:', data.message);
    }
  } catch (error) {
    console.error('Sign in error:', error.message);
  }
};

  

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1989/api/users/register', {
        username: signUpUsername,
        email: signUpEmail,
        password: signUpPassword,
        favoriteGenre: favoriteGenre,
      });

      const data = response.data;
      console.log('Sign up success:', data);
      onClose();
    } catch (error) {
      console.error('Sign up error:', error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1989/api/users/forgotPassword', {
        email: forgotPasswordEmail,
      });

      const data = response.data;
      console.log('Forgot password success:', data);
      onClose();
    } catch (error) {
      console.error('Forgot password error:', error.message);
    }
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
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
      <ModalContent className="popup-form">
        <div>
          <TabButton active={isSignIn} onClick={() => handleTabChange('signIn')}>Sign In</TabButton>
          <TabButton active={!isSignIn} onClick={() => handleTabChange('signUp')}>Sign Up</TabButton>
        </div>
        {isForgotPassword ? (
          <Form onSubmit={handleForgotPassword}>
            <input type="email" placeholder="Email" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)} required />
            <ButtonRow>
              <LinkButton href="#" onClick={handleForgotPassword} style={{ marginRight: 20 }}>Reset Password</LinkButton>
              <LinkButton href="#" onClick={handleClose} style={{ marginLeft: 20 }}>Close</LinkButton>
            </ButtonRow>
          </Form>
        ) : isSignIn ? (
          <Form onSubmit={handleSignIn}>
            <input type="email" placeholder="Email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} required />
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showSignInPassword ? 'text' : 'password'}
                placeholder="Password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={showSignInPassword ? faEye : faEyeSlash}
                onClick={() => setShowSignInPassword(!showSignInPassword)}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            </div>
            <ButtonRow style={{ justifyContent: 'space-between' }}>
              <LinkButton href="#" onClick={handleSignIn} style={{ marginRight: 20 }}>Sign In</LinkButton>
              <LinkButton href="#" onClick={handleClose} style={{ marginLeft: 20 }}>Close</LinkButton>
            </ButtonRow>
            <ForgotPasswordLink href="#" onClick={toggleForgotPassword}>Forgot Password?</ForgotPasswordLink>
          </Form>
        ) : (
          <Form onSubmit={handleSignUp}>
            <input type="text" placeholder="Username" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} required />
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showSignUpPassword ? 'text' : 'password'}
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={showSignUpPassword ? faEye : faEyeSlash}
                onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            </div>
            <select value={favoriteGenre} onChange={(e) => setFavoriteGenre(e.target.value)} required>
              <option value="" disabled>Select Favorite Genre</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="horror">Horror</option>
              <option value="sci-fi">Sci-Fi</option>
            </select>
            <ButtonRow style={{ justifyContent: 'space-between' }}>
              <LinkButton href="#" onClick={handleSignUp} style={{ marginRight: 20 }}>Sign Up</LinkButton>
              <LinkButton href="#" onClick={handleClose} style={{ marginLeft: 20 }}>Close</LinkButton>
            </ButtonRow>
          </Form>
        )}
      </ModalContent>
    </ModalBackground>
  );
};

export default AuthModal;
