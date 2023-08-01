const AsyncHandler = require('express-async-handler');
const Admin = require('../models/admin');
const { isPassMatched, hashPassword } = require('../utils/helper')
const { generateToken } = require('../utils/generateToken')


const registerAdminCtrl = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the admin with the provided email already exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res.status(409).json({ message: 'Admin with this email already exists' });
  }


  // Create a new admin object
  const newAdmin = await Admin.create({
    username,
    email,
    password : await hashPassword(password),
    role: 'admin'
})

  // Save the admin to the database
  await newAdmin.save();

  res.status(201).json({ message: 'Admin registered successfully' });
});

const adminLoginCtrl = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Find the admin with the provided email
    const admin = await Admin.findOne({ email });
  
    const isMatched = await isPassMatched(password, admin.password)

    // Check if the admin exists and if the password is correct
    if ( !isMatched ) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // If the email and password are correct, generate a JSON Web Token (JWT)
    res.json({
        data: generateToken(admin._id),
        message :"Admin logged in successfully"
    })
  
  });

module.exports = {
    registerAdminCtrl,
    adminLoginCtrl
};
