import React, { useState, useEffect } from 'react';
import {    PageContainer,
            Body,
            Footer,
            MoviesGrid,
            MovieCard,
            MovieTitle,
            MovieDetails,
            RemoveButton } from '../styles/watchListPageStyle'
            
import Header from '../Components/Header';

const WatchlistPage = () => {
  const [movies, setMovies] = useState([]);

  const handleLogout = () => {
    // Implement logout logic here
  };


  useEffect(() => {
    // Fetch watchlisted movies from backend
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:1989/api/watchlist');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching watchlisted movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleRemove = async (movieId) => {
    try {
      await fetch(`http://localhost:1989/api/watchlist/${movieId}`, {
        method: 'DELETE',
      });
      setMovies(movies.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error('Error removing movie from watchlist:', error);
    }
  };

  return (
    <PageContainer>
      <Header avatarUrl="/path/to/avatar.jpg" onLogout={handleLogout} />
      <Body>
        <MoviesGrid>
          {movies.length > 0 ? (
            movies.map(movie => (
              <MovieCard key={movie.id} backgroundImage={movie.image || 'default-image-url.jpg'}>
                <div>
                  <MovieTitle>{movie.name}</MovieTitle>
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
