const verifyToken = require('../utils/verifyToken'); // Import the verifyToken function

// Middleware to verify if the user is an admin
const isAdmin = (req, res, next) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(' ')[1]; // Assuming "Bearer token"

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token using the imported function
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Check if the user is an admin based on the role in the token
    if (decoded.role === 'admin') {
      req.userId = decoded.id; // Optional: attach userId to the request for further use
      next();
    } else {
      res.status(403).json({ message: 'Access Denied, admin only' });
    }
  } catch (error) {
    console.error('Error in isAdmin middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = isAdmin;
