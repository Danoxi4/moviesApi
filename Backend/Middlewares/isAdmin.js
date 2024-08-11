const Admin = require("../models/admin");

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  try {
    const user = req.user; // The user object attached by authenticateToken middleware

    console.log('User Object:', user); // Debugging line

    if (!user) {
      return res.status(401).json({ message: 'No user information available' });
    }

    if (user.role === 'admin') {
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
