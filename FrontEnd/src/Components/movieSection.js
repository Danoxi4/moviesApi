import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MovieCard, MovieImage, MovieInfo, MovieTitle, MovieDetails, MovieGrid } from '../styles/movieSectionStyle'; // Update the path to your styles

const MovieSection = () => {
  const [latestMovies, setLatestMovies] = useState([]);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const response = await axios.get('http://localhost:1989/api/movies/latest'); // Adjust the URL to match your API endpoint
        setLatestMovies(response.data.data);
      } catch (error) {
        console.error('Error fetching latest movies:', error);
      }
    };

    fetchLatestMovies();
  }, []);

  return (
    <section id="movies"> 
    <h1>TRENDING</h1>
    <MovieGrid>
      {latestMovies.map((movie) => (
        <MovieCard key={movie._id}>
          <MovieImage src={movie.poster} alt={movie.title} />
          <MovieInfo>
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieDetails>Genre: {movie.genre}</MovieDetails>
            <MovieDetails>Director: {movie.director}</MovieDetails>
            <MovieDetails>Release Date: {movie.releaseDate}</MovieDetails>
          </MovieInfo>
        </MovieCard>
      ))}
    </MovieGrid>
     </section>
  );
};

export default MovieSection;
