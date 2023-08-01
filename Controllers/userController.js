const movie = require('../Models/movie')
const user = require('../Models/user')
const AsyncHandler = require('express-async-handler')
const { isPassMatched, hashPassword } = require('../utils/helper')
const { generateToken } = require('../utils/generateToken')

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
             return res.json({
                 data: generateToken(newUser._id),
                 message :"Admin logged in successfully"
             })
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
  const usersId = req.userId; // Replace with the location where you store the userId after login
  const newUser = await user.findById(usersId).populate('favorites', 'title');

  if (!newUser) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(newUser.favorites);
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
  const usersId = req.userId; // Replace with the location where you store the userId after login
  const newUser = await user.findById(usersId).populate('watchlist', 'title');

  if (!newUser) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(newUser.watchlist);
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



module.exports = {
    getWatchlistCtrl,
    addToWatchlistCtrl,
    removeFromWatchlistCtrl,
    userRegistrationCtrl,
    userLoginCtrl,
    getUserFavoritesCtrl,
    addToFavoritesCtrl,
    removeFromFavoritesCtrl,
    userRecommendationsCtrl
}