import React, { useEffect, useState } from 'react';
import {
        PageContainer,
        Body,
        Footer,
        MoviesGrid,
        MovieCard,
        MovieDetails,
        MovieTitle,
        MovieRating,
        MovieGenre,
        MovieDirector,
        RemoveButton } from '../styles/favoritesStyle'

import Header from '../Components/Header'

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  
  const handleLogout = () => {
    // Implement logout logic here
  };



  useEffect(() => {
    // Fetch favorite movies from the backend
    const fetchFavorites = async () => {
      try {
        const response = await fetch('http://localhost:1989/api/movies/favorites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:1989/api/movies/favorites/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== movieId));
      console.log('Movie removed from favorites:', movieId);
    } catch (error) {
      console.error('Error removing favorite movie:', error);
    }
  };

  return (
    <PageContainer>
      <Header avatarUrl="/path/to/avatar.jpg" onLogout={handleLogout} />
      <Body>
        <h2>Your Favorite Movies</h2>
        {favorites.length > 0 ? (
          <MoviesGrid>
            {favorites.map((movie) => (
              <MovieCard key={movie.id} bgImage={movie.backgroundImage || 'default-movie.jpg'}>
                <MovieDetails>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieRating>{movie.rating}</MovieRating>
                  <MovieGenre>{movie.genre}</MovieGenre>
                  <MovieDirector>{movie.director}</MovieDirector>
                  <RemoveButton onClick={() => handleRemoveFavorite(movie.id)}>Remove from Favorites</RemoveButton>
                </MovieDetails>
              </MovieCard>
            ))}
          </MoviesGrid>
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </Body>
      <Footer>
        <p>&copy; 2024 MovieLand. All rights reserved.</p>
      </Footer>
    </PageContainer>
  );
};

export default FavoritesPage;
