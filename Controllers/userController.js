const movie = require('../Models/movie')
const user = require('../Models/user')
const AsyncHandler = require('express-async-handler')
const { isPassMatched, hashPassword } = require('../utils/helper')

const userRegistrationCtrl  = AsyncHandler( async(req,res) => {

    const { username, email, password , favoriteGenre } = req.body

        const userFound = await user.findOne( { email } )

        if ( userFound ) {
            throw new Error("email already in use")
        }

        const user = await user.create({
            username,
            email,
            password : await hashPassword(password),
            favoriteGenre
        })

        res.status(201).json({
            status: 'success',
            data: user
        })

})

const userLoginCtrl =  AsyncHandler(async (req,res)=>{

         const { email, password } = req.body
         
         const user = await user.findOne({email})

         if(!user){
             return res.json({message:"account not found"})
         }
 
         const isMatched = await isPassMatched(password, user.password)
 
         if(!isMatched){
             return res.json({message:"Invalid login credentials"})
         }
         else{
             return res.json({
                 data: generateToken(user._id),
                 message :"Admin logged in successfully"
             })
         }
 
 })

const userRecommendationsCtrl = asyncHandler(async (req, res) => {

    const userId = req.session.userId; // Replace with the location where you store the logged-in user's ID
    const user = await User.findById(userId);
  
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
  
    const favoriteGenre = user.favoriteGenre;
  
    // Fetch top rated movies from the user's favorite genre
    const recommendations = await Movie.find({ genre: favoriteGenre })
      .sort({ rating: -1 }) // Sort by rating in descending order
      .limit(10); // Limit the number of recommendations to 10
  
    res.json(recommendations);

  });

const getUserFavoritesCtrl = asyncHandler(async (req, res) => {
  const userId = req.session.userId; // Replace with the location where you store the userId after login
  const user = await User.findById(userId).populate('favorites', 'title');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user.favorites);
});

const addToFavoritesCtrl = asyncHandler(async (req, res) => {
  const userId = req.session.userId; // Replace with the location where you store the userId after login
  const movieId = req.params.movieId;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.favorites.includes(movieId)) {
    res.status(400);
    throw new Error('Movie already in favorites');
  }

  user.favorites.push(movieId);
  await user.save();

  res.json({ message: 'Movie added to favorites' });
});

const removeFromFavoritesCtrl = asyncHandler(async (req, res) => {
  const userId = req.session.userId; // Replace with the location where you store the userId after login
  const movieId = req.params.movieId;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (!user.favorites.includes(movieId)) {
    res.status(400);
    throw new Error('Movie not found in favorites');
  }

  user.favorites.pull(movieId);
  await user.save();

  res.json({ message: 'Movie removed from favorites' });
});

const getWatchlistCtrl = asyncHandler(async (req, res) => {
  const userId = req.session.userId; // Replace with the location where you store the userId after login
  const user = await User.findById(userId).populate('watchlist', 'title');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user.watchlist);
});

const addToWatchlistCtrl = asyncHandler(async (req, res) => {
  const userId = req.session.userId; // Replace with the location where you store the userId after login
  const movieId = req.params.movieId;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.watchlist.includes(movieId)) {
    res.status(400);
    throw new Error('Movie already in watchlist');
  }

  user.watchlist.push(movieId);
  await user.save();

  res.json({ message: 'Movie added to watchlist' });
});

const removeFromWatchlistCtrl = asyncHandler(async (req, res) => {
  const userId = req.session.userId; // Replace with the location where you store the userId after login
  const movieId = req.params.movieId;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (!user.watchlist.includes(movieId)) {
    res.status(400);
    throw new Error('Movie not found in watchlist');
  }

  user.watchlist.pull(movieId);
  await user.save();

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