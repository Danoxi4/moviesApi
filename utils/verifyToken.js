const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'anykey');
    return decoded;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = verifyToken;
