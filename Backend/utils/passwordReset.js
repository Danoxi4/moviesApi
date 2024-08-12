const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Utility function to generate a reset token
const generateResetToken = (userId, secret) => {
  return jwt.sign({ id:  userId }, secret, {expiresIn : '1h'});
};

// Utility function to send a reset email
const sendResetEmail = async (email, resetLink, emailUser, emailPass) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const mailOptions = {
    from: emailUser,
    to: email,
    subject: 'Password Reset Request',
    html: `<p>You requested a password reset. Click the link below to reset your password:</p>
           <a href="${resetLink}">Reset Password</a>
           <p>If you did not request this, please ignore this email.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { generateResetToken, sendResetEmail };
