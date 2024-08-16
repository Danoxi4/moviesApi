import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Poster,
  DetailsContainer,
  Title,
  Genre,
  Rating,
  ReleaseDate,
  Director,
  Cast,
  Description,
} from '../styles/singleMoviePageStyle';

import { ActionButton, MovieActions } from '../styles/moviesPageStyle';
import { useAuthContext } from '../Hook/useAuthContext'; // Import for user data
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faList } from '@fortawesome/free-solid-svg-icons';





const SingleMoviePage = () => {
  const { user } = useAuthContext();
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:1989/api/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const handleAddToFavorites = async (movieId) => {
    try {
      await axios.post(`http://localhost:1989/api/users/favorites/${id}`);
      alert('Movie added to favorites!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleAddToWatchlist = async (movieId) => {
    try {
      await axios.post(`http://localhost:1989/api/users/watchlist/${id}`);
      alert('Movie added to watchlist!');
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };
   

  return (
    <Container>
      <Poster src={movie.poster} alt={movie.title} />
      <DetailsContainer>
        <Title>{movie.title}</Title>
        <MovieActions>
          <ActionButton style={{ fontSize: '1.2rem' }} onClick={() => handleAddToFavorites(movie._id)}>
            <FontAwesomeIcon icon={faHeart} />
          </ActionButton>
          <ActionButton style={{ fontSize: '1.2rem' }} onClick={() => handleAddToWatchlist(movie._id)}>
            <FontAwesomeIcon icon={faList} />
          </ActionButton>
        </MovieActions>
        <Genre>Genre: {movie.genre}</Genre>
        <Rating>Rating: {movie.ratingAverage.toFixed(1)} / 5</Rating>
        <ReleaseDate>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</ReleaseDate>
        <Director>Director: {movie.director}</Director>
        <Cast>
          Cast: {movie.cast}
        </Cast>
        <Description>{movie.description}</Description>
      
      </DetailsContainer>
    </Container>
  );
};

export default SingleMoviePage;
