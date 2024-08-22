import React, { useState, useEffect } from 'react';
import {    PageContainer,
            Body,
            Footer,
            MoviesGrid,
            MovieCard,
            MovieTitle,
            MovieDetails,
            RemoveButton,
            WatchlistTitle } from '../styles/watchListPageStyle'

import { useNavigate } from 'react-router-dom';
import Header from '../Components/userHeader';
import { useAuthContext } from '../Hook/useAuthContext'; // Adjust the path as necessary




const WatchlistPage = () => {
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate()
  const { dispatch, user, token } = useAuthContext();


  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login'); // Redirect to login page
  };
 
  const fetchMovies = async () => {
    try {
      console.log("token at favorites: " , token)
      const response = await fetch('http://localhost:1989/api/users/watchlist', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header   
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching favorite movies:', error);
    }
  };

  useEffect(() => {
    // Fetch watchlisted movies from backend
    fetchMovies();
  }, []);

  const handleRemove = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:1989/api/users/watchlist/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header   
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      fetchMovies();
      setMovies((prevFavorites) => prevFavorites.filter((movie) => movie.id !== movieId));
      console.log('Movie removed from favorites:', movieId);
    } catch (error) {
      console.error('Error removing favorite movie:', error);
    }
  };

  return (
    <PageContainer>
      <Header avatarUrl={user.email} onLogout={handleLogout} />
      <Body>
      <WatchlistTitle>Your Watchlist Movies</WatchlistTitle>
        <MoviesGrid>
          {movies.length > 0 ? (
            movies.map(movie => (
              <MovieCard key={movie.id} backgroundImage={movie.poster || 'default-image-url.jpg'}>
                <div>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieDetails>Rating: {movie.rating}</MovieDetails>
                  <MovieDetails>Genre: {movie.genre}</MovieDetails>
                  <MovieDetails>Director: {movie.director}</MovieDetails>
                  <RemoveButton onClick={() => handleRemove(movie.id)}>Remove from Watchlist</RemoveButton>
                </div>
              </MovieCard>
            ))
          ) : (
            <p>No movies in watchlist.</p>
          )}
        </MoviesGrid>
      </Body>
      <Footer>Footer Content</Footer>
    </PageContainer>
  );
};

export default WatchlistPage;
