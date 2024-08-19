const movie = require('../Models/movie')
const user = require('../Models/user')
const Comment = require('../Models/comment'); // Adjust the path to where your Comment model is located
const AsyncHandler = require('express-async-handler')
const { isPassMatched, hashPassword } = require('../utils/helper')
const { generateToken } = require('../utils/generateToken')
const { generateResetToken, sendResetEmail } = require('../utils/passwordReset');
const { JWT_SECRET, EMAIL_USER, EMAIL_PASS, FRONTEND_URL } = process.env;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/emailUtils'); // Adjust the path to your email utility
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Generate a password reset token and send it via email
const requestPasswordReset = AsyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendEmail(user.email, 'Password Reset', `Click this link to reset your password: ${resetURL}`);

    res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reset the user's password
const resetPassword = AsyncHandler(async (req, res) => {

  try {
    const { password } = req.body;
    const { token } = req.params; // Get the token from the URL parameter
  
    console.log('Received token:', token); // Log the received token
    console.log('Request body:', req.body);
    console.log("new password: ", password) // Log the request body
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded token:', decoded); // Log the decoded token

    const User = await user.findById(decoded.id); // Fetch the user by ID
    console.log('User:', User);
    if (!User) {
      return res.status(400).json({ message: 'User not found' });
    }

    const hashedPassword = await hashPassword(password);
    console.log('Hashed password:', hashedPassword);
    User.password = hashedPassword;
    await User.save();

     res.status(200).json({
      message: 'Password has been reset',
      user: {
        id: User._id,
        username: User.username,
        email: User.email,
        favoriteGenre: User.favoriteGenre
      }
    })
  } catch (error) {
    console.error('Error in resetPassword controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Controller to handle forgot password request
const forgotPassword = AsyncHandler( async (req, res) => {
  const { email } = req.body;

  try {
    const User = await user.findOne({ email });

    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = generateResetToken(User._id, JWT_SECRET);
    const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;

    await sendResetEmail(email, resetLink, EMAIL_USER, EMAIL_PASS);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error in forgotPassword controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const userRegistrationCtrl  = AsyncHandler( async(req,res) => {

    const { username, email, password , favoriteGenre } = req.body

        const userFound = await user.findOne( { email } )

        if ( userFound ) {
            throw new Error("email already in use")
        }

        const newUser = await user.create({
            username,
            email,
            password : await hashPassword(password),
            favoriteGenre
        })

        res.status(201).json({
            status: 'success',
            data: newUser
        })

})

const userLoginCtrl =  AsyncHandler(async (req,res)=>{

         const { email, password } = req.body
         
         const newUser = await user.findOne({email})

         if(!newUser){
             return res.json({message:"account not found"})
         }
 
         const isMatched = await isPassMatched(password, newUser.password)
 
         if(!isMatched){
             return res.json({message:"Invalid login credentials"})
         }
         else{
            const token = generateToken(newUser._id); 
            res.json({ token, message: "User logged in successfully" , username: newUser.username});
            // req.user = newUser
            // req.userId = newUser._id
            // res.redirect(`/recommendations`);
                  
            //  return 
            // res.json({
            //       data: generateToken(newUser._id),
            //       message :"user logged in successfully"
            //   })
         }
 
 })

 const userRecommendationsCtrl = AsyncHandler(async (req, res) => {
  const usersId = req.userId;
  console.log("User ID:", usersId); // Add this line to check if the user ID is getting passed correctly

  const newUser = await user.findById(usersId);

  if (!newUser) {
    console.log("User not found in database"); // Add this line to check if the user is found or not
    res.status(404);
    throw new Error('User not found');
  }

  const favoriteGenre = newUser.favoriteGenre;

  // Fetch top-rated movies from the user's favorite genre
  const recommendations = await movie.find({ genre: favoriteGenre })
    .sort({ rating: -1 }) // Sort by rating in descending order
    .limit(10); // Limit the number of recommendations to 10

  res.json(recommendations);
});

const getUserFavoritesCtrl = AsyncHandler(async (req, res) => {
  const userId = req.userId; // Assuming userId is available in req

  // Fetch the user and populate only the required fields from the favorites array
  const newUser = await user.findById(userId).populate('favorites', 'title rating genre director poster');

  if (!newUser) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(newUser.favorites);
  console.log("Favorites fetched:", newUser.favorites);
});


const addToFavoritesCtrl = AsyncHandler(async (req, res) => {
  const usersId = req.userId; // Replace with the location where you store the userId after login
  const movieId = req.params.movieId;

  const newUser = await user.findById(usersId);

  if (!newUser) {
    res.status(404);
    throw new Error('User not found');
  }

  if (newUser.favorites.includes(movieId)) {
    res.status(400);
    throw new Error('Movie already in favorites');
  }

  newUser.favorites.push(movieId);
  await newUser.save();

  res.json({ message: 'Movie added to favorites' });
});

const removeFromFavoritesCtrl = AsyncHandler(async (req, res) => {
  const usersId = req.userId; // Replace with the location where you store the userId after login
  const movieId = req.params.movieId;

  const newUser = await user.findById(usersId);

  if (!newUser) {
    res.status(404);
    throw new Error('User not found');
  }

  if (!newUser.favorites.includes(movieId)) {
    res.status(400);
    throw new Error('Movie not found in favorites');
  }

  newUser.favorites.pull(movieId);
  await newUser.save();

  res.json({ message: 'Movie removed from favorites' });
});

const getWatchlistCtrl = AsyncHandler(async (req, res) => {
  const userId = req.userId; // Assuming userId is available in req

  // Fetch the user and populate only the required fields from the favorites array
  const newUser = await user.findById(userId).populate('watchlist', 'title rating genre director poster');

  if (!newUser) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(newUser.watchlist);
  console.log("WatchList fetched:", newUser.watchlist);
});

const addToWatchlistCtrl = AsyncHandler(async (req, res) => {
  const usersId = req.userId; // Replace with the location where you store the userId after login
  const movieId = req.params.movieId;

  const newUser = await user.findById(usersId);

  if (!newUser) {
    res.status(404);
    throw new Error('User not found');
  }

  if (newUser.watchlist.includes(movieId)) {
    res.status(400);
    throw new Error('Movie already in watchlist');
  }

  newUser.watchlist.push(movieId);
  await newUser.save();

  res.json({ message: 'Movie added to watchlist' });
});

const removeFromWatchlistCtrl = AsyncHandler(async (req, res) => {
  const usersId = req.userId; // Replace with the location where you store the userId after login
  const movieId = req.params.movieId;

  const newUser = await user.findById(usersId);

  if (!newUser) {
    res.status(404);
    throw new Error('User not found');
  }

  if (!newUser.watchlist.includes(movieId)) {
    res.status(400);
    throw new Error('Movie not found in watchlist');
  }

  newUser.watchlist.pull(movieId);
  await newUser.save();

  res.json({ message: 'Movie removed from watchlist' });
});

// Controller to get movies based on the user's favorite genre
const getMoviesByFavoriteGenre = AsyncHandler(async (req, res) => {
  try {
    console.log('Getting movies from recommendations...');
    console.log(req.user)
    const User = await user.findById(req.user._id);
    console.log(User)
    const { favoriteGenre } = User;
     // Assuming you have the user's favorite genre in the req.user after authentication
    console.log(favoriteGenre)
    if (!favoriteGenre) {
      return res.status(400).json({ message: 'Favorite genre not found' });
    }

    const movies = await movie.find({ genre: favoriteGenre });
    console.log(movies)
    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: 'No movies found for your favorite genre' });
    }

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


const addComment = async (req, res) => {
  console.log("reach add comment")
  const { name, text } = req.body;

  if (!name || !text) {
    return res.status(400).json({ message: 'Name and comment text are required.' });
  }

  try {
    const newComment = new Comment({ name, text });
    await newComment.save();
    console.log("comment saved")
    res.status(201).json({ message: 'Comment added successfully!', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment.', error: error.message });
  }
};



module.exports = {
    getWatchlistCtrl,
    addToWatchlistCtrl,
    removeFromWatchlistCtrl,
    userRegistrationCtrl,
    userLoginCtrl,
    getUserFavoritesCtrl,
    addToFavoritesCtrl,
    removeFromFavoritesCtrl,
    userRecommendationsCtrl,
    forgotPassword,
    requestPasswordReset,
    resetPassword,
    getMoviesByFavoriteGenre,
    addComment
}