import React, { useState, useEffect } from 'react';
import { MoviesContainer, MovieCard, MovieImage, MovieInfo, MovieTitle, MovieDetails, Header, SearchBox, BrandName, ActionButton, MovieActions } from '../styles/moviesPageStyle';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faList } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hook/useAuthContext';



const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuthContext();


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:1989/api/movies');
        // Ensure that response.data is an array
        if (Array.isArray(response.data.data)) {
          setMovies(response.data.data); // Update based on the actual structure of the API response
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // If movies is not an array, don't try to filter it
  const filteredMovies = Array.isArray(movies) ? movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const handleAddToFavorites = async (movieId) => {
    try {
      await axios.post(`http://localhost:1989/api/users/favorites/${movieId}`);
      alert('Movie added to favorites!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleAddToWatchlist = async (movieId) => {
    try {
      await axios.post(`http://localhost:1989/api/users/watchlist/${movieId}`);
      alert('Movie added to watchlist!');
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };
   
  

  return (
    <>
      <Header>
        <BrandName>MovieLand</BrandName>
        <SearchBox
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Header>
      <MoviesContainer>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie._id} onClick={() => navigate(`/movie/${movie._id}`)}>
            <MovieImage src={movie.poster} alt={movie.title} />
            <MovieInfo>
              <MovieTitle>Title: {movie.title}</MovieTitle>
              <MovieDetails>Genre: {movie.genre}</MovieDetails>
              <MovieDetails>Director: {movie.director || 'Unknown'}</MovieDetails>
              <MovieDetails>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</MovieDetails>
              <MovieActions>
                <ActionButton onClick={() => handleAddToFavorites('favorites')}>
                  <FontAwesomeIcon icon={faHeart} />
                </ActionButton>
                <ActionButton onClick={() => handleAddToWatchlist('watchlist')}>
                  <FontAwesomeIcon icon={faList} />
                </ActionButton>
              </MovieActions>
            </MovieInfo>
          </MovieCard>
        ))}
      </MoviesContainer>
    </>
  );
};

export default MoviesPage;
