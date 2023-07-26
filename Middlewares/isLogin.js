const { verifyToken } = require('../utils/verifyToken');

const isLogin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    // Token is missing
    return res.status(401).json({ message: 'No token provided. Please login first.' });
  }

  // Token format: "Bearer <token>"
  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    // Invalid token format
    return res.status(401).json({ message: 'Invalid token format. Please provide a valid Bearer token.' });
  }

  const tokenValue = tokenParts[1];

  const decodedPayload = verifyToken(tokenValue);

  if (!decodedPayload) {
    // Invalid or expired token
    return res.status(401).json({ message: 'Invalid or expired token. Please login again.' });
  }

  // Add the decoded payload (e.g., user ID) to the request object for use in subsequent middleware/routes
  req.userId = decodedPayload.id;

  // Continue with the next middleware/route
  next();
};

module.exports = isLogin;
