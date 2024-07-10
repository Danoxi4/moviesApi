// src/components/LoginModal.js

import React from 'react';
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
  width: 300px;
  text-align: center;
`;

const CloseButton = styled.button`
  background: #266CA9; /* Medium blue background */
  color: #ADE1FB; /* Light blue text */
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s;

  &:hover {
    background: #0F2573; /* Darker blue background */
  }
`;

const LoginModal = ({ onClose }) => {
  return (
    <ModalBackground>
      <ModalContent>
        <h2>Login</h2>
        {/* Add your form here */}
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalBackground>
  );
};

export default LoginModal;
