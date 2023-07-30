const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'anyKey');
    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = verifyToken;
