const AsyncHandler = require('express-async-handler');
//const Movie = require('../models/movie');

// Controller function to upload a new movie
const uploadMoviesCtrl = AsyncHandler(async (req, res) => {
  const { title, genre, rating, releaseDate } = req.body;

  // Perform validation on the request body
  if (!title || !genre || !rating || !releaseDate) {
    return res.status(400).json({ message: 'Please provide all required movie details' });
  }

  const newMovie = new Movie({
    title,
    genre,
    rating,
    releaseDate,
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
  const movieId = req.params.movieId;

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
  const { name } = req.query;
  const movies = await Movie.find({ title: { $regex: name, $options: 'i' } });

  res.json(movies);
});

// Controller function to search movies by genres
const searchGenresCtrl = AsyncHandler(async (req, res) => {
  const { genre } = req.query;
  const movies = await Movie.find({ genre });

  res.json(movies);
});

// Controller function to search movies by release date
const searchReleaseDateCtrl = AsyncHandler(async (req, res) => {
  const { releaseDate } = req.query;
  const movies = await Movie.find({ releaseDate });

  res.json(movies);
});

// Controller function to like a movie
const likeMovieCtrl = AsyncHandler(async (req, res) => {
  const movieId = req.params.movieId;

  // Check if the movieId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: 'Invalid movie ID' });
  }

  // Code to handle movie likes and update the database
  // ...

  res.json({ message: 'Movie liked successfully' });
});

// Controller function to add a comment to a movie
const commentMovieCtrl = AsyncHandler(async (req, res) => {
  const movieId = req.params.movieId;
  const { comment } = req.body;

  // Check if the movieId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: 'Invalid movie ID' });
  }

  // Code to handle adding comments to the movie and update the database
  // ...

  res.json({ message: 'Comment added successfully' });
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
  commentMovieCtrl,
};
