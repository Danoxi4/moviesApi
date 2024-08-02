const AsyncHandler = require('express-async-handler');
const mongoose = require('mongoose')
const Movie = require('../Models/movie');
const axios = require('axios')
const user = require('../Models/user');
require('dotenv').config()

const OMDB_API_KEY = process.env.OMDB_API_KEY || "bc2fe0a4"



const uploadMoviesCtrl = AsyncHandler(async (req, res) => {
  const { title, genre, releaseDate, director, rating = 0 } = req.body;

  // Perform validation on the request body
  if (!title || !genre || !releaseDate || !director) {
    return res.status(400).json({ message: 'Please provide all required movie details' });
  }

  const newMovie = new Movie({
    title,
    genre,
    rating, // This will default to 0 if not provided
    releaseDate,
    director,
    poster: req.file ? req.file.path : '', // Assuming multer middleware is used for file uploads
  });

  const savedMovie = await newMovie.save();
  res.status(201).json(savedMovie);
});

// Controller function to update an existing movie
const updateMovieCtrl = AsyncHandler(async (req, res) => {
  const movieId = req.params.movieId;
  const { title, genre, rating, releaseDate } = req.body;

  // Check if the movieId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: 'Invalid movie ID' });
  }

  const updatedMovie = await Movie.findByIdAndUpdate(
    movieId,
    { title, genre, rating, releaseDate },
    { new: true }
  );

  if (!updatedMovie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  res.json(updatedMovie);
});

const getMovies = AsyncHandler(async (req, res) => {
  try {
    // Fetch movies from the database
    const movies = await Movie.find(); // You can also add filtering, sorting, or pagination here

    if (movies.length === 0) {
      return res.status(404).json({ message: 'No movies found' });
    }

    // Send the list of movies
    res.status(200).json({
      status: 'success',
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching movies',
      error: error.message,
    });
  }
});

// Controller function to delete a movie
const deleteMovieCtrl = AsyncHandler(async (req, res) => {
  const movieId = req.params.movieId;

  // Check if the movieId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: 'Invalid movie ID' });
  }

  const deletedMovie = await Movie.findByIdAndDelete(movieId);

  if (!deletedMovie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  res.json({ message: 'Movie deleted successfully' });
});

// Controller function to fetch a single movie by its ID
const getMovieCtrl = AsyncHandler(async (req, res) => {
  const movieId = req.params.Id;

  // Check if the movieId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: 'Invalid movie ID' });
  }

  const movie = await Movie.findById(movieId);

  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  res.json(movie);
});

// Controller function to search movies by name
const searchNameCtrl = AsyncHandler(async (req, res) => {
  const { name } = req.body;
  
  //db fetch
  //const movies = await Movie.find({ title: { $regex: name, $options: 'i' } });

  /************ */
  const omdbResponse = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${name}`);
  //  Check if the OMDB API request was successful
  if (omdbResponse.data.Response === 'True') {
    // Extract the movie data from the response
    const movies = omdbResponse.data.Search;

    // Return the movie data to your API's clients
    res.status(200).json({ movies });
  } else {
    // Handle cases where the OMDB API did not return data
    res.status(404).json({ message: 'No movies found' });
  }
  /********************* */


 // res.json(movies);
});

// Controller function to search movies by genres
const searchGenresCtrl = AsyncHandler(async (req, res) => {
  const  { genre }  = req.body;
  
  //fetch from the db
  //const movies = await Movie.find({ genre });

    // Make a request to the OMDB API for movies by genre
    const omdbResponse = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${genre}&type=movie`);

    // Check if the OMDB API request was successful
    if (omdbResponse.data.Response === 'True') {
      //  Extract the movie data from the response
      const movies = omdbResponse.data.Search;

      //   Return the movie data to your API's clients
      res.status(200).json({ movies });
    } else {
      //  Handle cases where the OMDB API did not return data
      res.status(404).json({ message: 'No movies found for this genre' });
    }

  //res.json(movies);
});

// Controller function to search movies by release date
const searchReleaseDateCtrl = AsyncHandler(async (req, res) => {
  const {releaseDate}  = req.body ;
  
  //fetch movie  
  //const movies = await Movie.find({ releaseDate });

  //  Make a GET request to the OMDB API for movies by release date
  const omdbResponse = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&Year=${releaseDate}&type=movie`);

  //  Check if the OMDB API request was successful
  if (omdbResponse.data.Response === 'True') {
    //  Extract the movie data from the response
    const movies = omdbResponse.data.Search;

    //  Return the movie data to your API's clients
    res.status(200).json({ movies });
  } else {
    //  Handle cases where the OMDB API did not return data
    res.status(404).json({ message: 'No movies found for this release date' });
  }

  res.json(movies);
});

// Controller function to like a movie
const likeMovieCtrl = AsyncHandler(async (req, res) => {
  const movieId = req.params.id;

  // Check if the movieId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: 'Invalid movie ID' });
  }

  // Find the movie in the database
  const movie = await Movie.findById(movieId);
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  // Get the user ID from the request (assuming you have already implemented the isLogin middleware)
  const usersId = req.userId;

  // Find the user in the database
  const newUser = await user.findById(usersId);
  if (!newUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the movie is already in the user's favorites
  if (newUser.favorites.includes(movieId)) {
    return res.status(409).json({ message: 'Movie is already in favorites' });
  }

  // Add the movie to the user's favorites
  newUser.favorites.push(movieId);

  // Increase the likes count of the movie
  movie.likes += 1;

  // Save the changes to the database
  await newUser.save();
  await movie.save();

  res.json({ message: 'Movie liked successfully' });
});


// Controller function to add a comment to a movie
const reviewMovieCtrl = AsyncHandler(async (req, res) => {
  const movieId = req.params.id;
  console.log(req.user)
  const { comment, rating } = req.body;

  // Check if the movieId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: 'Invalid movie ID' });
  }

  try {
    // Find the movie by its ID
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Create a new review object
    const review = {
      userId: req.user._id, // Assuming you have implemented user authentication and have access to the user's ID
      rating,
      comment,
      createdAt: new Date(),
    };

    // Add the review to the movie's reviews array
    movie.reviews.push(review);

    // Calculate the average rating
    const totalRatings = movie.reviews.length;
    let sumOfRatings = 0;

    for (const review of movie.reviews) {
      sumOfRatings += review.rating;
    }

    movie.ratingAverage = totalRatings > 0 ? sumOfRatings / totalRatings : 0;

    // Save the updated movie to the database
    await movie.save();

    res.json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = {
  uploadMoviesCtrl,
  updateMovieCtrl,
  deleteMovieCtrl,
  getMovieCtrl,
  searchNameCtrl,
  searchGenresCtrl,
  searchReleaseDateCtrl,
  likeMovieCtrl,
  reviewMovieCtrl,
  getMovies
};
