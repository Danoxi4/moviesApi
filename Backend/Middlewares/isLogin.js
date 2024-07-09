const verifyToken = require("../utils/verifyToken");
const user = require("../Models/user");

const isLogin = async (req, res, next) => {
    // Get token from header
    const headerObj = req.headers;
    const token = headerObj && headerObj.authorization && headerObj.authorization.split(" ")[1];
  
    const verifiedToken = verifyToken(token);
  
    console.log("Verified Token:", verifiedToken); // Add this line to check the value of verifiedToken
  
    // Verify the token
    if (verifiedToken) {
      const newUser = await user.findById(verifiedToken.id).select("username email");
  
      // Save the user ID to the request object
      req.userId = verifiedToken.id;
      req.user = newUser;
      next();
    } else {
      const err = new Error("Token expired/invalid");
      next(err);
      //console.log(err)
    }
  };
  

module.exports = isLogin;
