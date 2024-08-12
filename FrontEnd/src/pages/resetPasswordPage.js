// src/pages/ResetPasswordPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { ResetPasswordContainer, ResetPasswordForm, Input, Button, Message } from '../styles/resetPasswordStyle'; // Import styles
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ResetPasswordPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      console.log(token)
      const response = await axios.post(`http://localhost:1989/api/users/reset-password/${token}`, {
        password: newPassword,
      });

      if (response.status === 200) {
        setSuccess('Password reset successful!');
        navigate('/user-page', { state: { user: response.data.user } });
        setError('');
      }
    } catch (error) {
      console.log(error);
      setError('Error resetting password.');
      setSuccess('');
    }
  };


  return (
    <ResetPasswordContainer>
      <ResetPasswordForm onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <Message>{error}</Message>}
        {success && <Message style={{ color: '#00ff00' }}>{success}</Message>}
        <Button type="submit">Reset Password</Button>
      </ResetPasswordForm>
    </ResetPasswordContainer>
  );
};

export default ResetPasswordPage;
