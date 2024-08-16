const AsyncHandler = require('express-async-handler');
const Admin = require('../models/admin');
const { isPassMatched, hashPassword } = require('../utils/helper')
const { generateToken } = require('../utils/generateToken')
const User = require('../Models/user')
const Movie = require('../Models/movie')
const { sendEmail } = require('../utils/emailUtils')
// const PageView = require('../models/PageView'); // Assuming you have a PageView model



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

const getUsers = AsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});


// analyticsController.js

// Get page views aggregated by time frame (days, months, years)
// const getPageViews = async (req, res) => {
//     try {
//         const { timeframe } = req.query; // timeframe can be 'days', 'months', or 'years'

//         let groupBy = null;
//         if (timeframe === 'days') {
//             groupBy = { $dayOfMonth: "$timestamp" };
//         } else if (timeframe === 'months') {
//             groupBy = { $month: "$timestamp" };
//         } else if (timeframe === 'years') {
//             groupBy = { $year: "$timestamp" };
//         } else {
//             return res.status(400).json({ error: "Invalid timeframe" });
//         }

//         const data = await PageView.aggregate([
//             {
//                 $group: {
//                     _id: groupBy,
//                     count: { $sum: 1 }
//                 }
//             },
//             { $sort: { _id: 1 } } // Sort by time
//         ]);

//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch page views' });
//     }
// };


// Get users aggregated by their favorite genre
const getUsersByFavoriteGenre = async (req, res) => {
  try {
      const data = await User.aggregate([
          {
              $group: {
                  _id: "$favoriteGenre",
                  count: { $sum: 1 }
              }
          }
      ]);

      res.status(200).json(data);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users by favorite genre' });
  }
};

// Get most liked movies
const getMostLikedMovies = async (req, res) => {
  try {
      // Fetch the top 10 most liked movies, selecting the relevant fields and including the average rating
      const data = await Movie.find({})
          .sort({ likes: -1 }) // Sort by likes in descending order
          .limit(10) // Limit to top 10 movies
          .select('title likes ratingAverage') // Select only title, likes, and the virtual field ratingAverage
          .exec();

      res.status(200).json(data);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch most liked movies' });
  }
};

const getMoviesByGenre = async (req, res) => {
  try {
      const data = await Movie.aggregate([
          {
              $group: {
                  _id: "$genre",
                  count: { $sum: 1 }
              }
          }
      ]);

      res.status(200).json(data);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch movies by genre' });
  }
};

const sendEmailController = async (req, res) => {
    const { name, comment } = req.body;
  
    try {
      await sendEmail('danialemayehu32@gmail.com', `New message from ${name}`, comment);
      res.status(200).send('Message sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send message.');
    }
  };

module.exports = {
    registerAdminCtrl,
    adminLoginCtrl,
    getUsers,
    // getPageViews,
    getMostLikedMovies,
    getMoviesByGenre,
    getUsersByFavoriteGenre
};
