import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/userHeader';
import { useAuthContext } from '../Hook/useAuthContext'; // Adjust the path as needed
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
  RemoveButton
} from '../styles/favoritesStyle';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const { user, token , dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/'); // Redirect to login page
  };

  const fetchFavorites = async () => {
    try {
      console.log("token at favorites: " , token)
      const response = await fetch('http://localhost:1989/api/users/favorites', {
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
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorite movies:', error);
    }
  };

  useEffect(() => {
    // Fetch favorite movies from the backend
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:1989/api/users/favorites/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header   
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      fetchFavorites();
      setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== movieId));
      console.log('Movie removed from favorites:', movieId);
    } catch (error) {
      console.error('Error removing favorite movie:', error);
    }
  };

  console.log(user.email)

  return (
    <PageContainer>
      <Header avatarUrl={user?.username} onLogout={handleLogout} />
      <Body>
        <h2>Your Favorite Movies</h2>
        {favorites.length > 0 ? (
          <MoviesGrid>
            {favorites.map((movie) => (
              <MovieCard key={movie.id} bgImage={movie.poster || 'default-movie.jpg'}>
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
