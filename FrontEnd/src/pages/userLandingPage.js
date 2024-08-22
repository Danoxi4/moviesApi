import React, { useState, useEffect } from 'react';
import { LandingPageContainer, MovieCard, MovieDetails, MoviesContainer, MovieImage, MovieInfo, MovieTitle, MovieActions, ActionButton } from '../styles/userLandingPageStyle';
import { useAuthContext } from '../Hook/useAuthContext'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faList } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import  Header from '../Components/userHeader'

// Import the movie card component

const UserLandingPage = () => {
  
  const { user, token , dispatch } = useAuthContext();

  console.log("navigating to LandingPage");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();



  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/'); // Redirect to login page
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:1989/api/users/landingPage', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setMovies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch movies', error);
      }
    };

    if (user) {
      fetchMovies();
    }
  }, [user]);


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
    <LandingPageContainer>
      <Header avatarUrl={user?.email} onLogout={handleLogout}/>
      <div className="content">
        <h1>Welcome, {user?.username || 'User'}!</h1>
        <p>Select an option from the navbar to manage your movies, favorites, and watchlist.</p>

        <MoviesContainer>
        {movies.map((movie) => (
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
      </div>
    </LandingPageContainer>
  );
};

export default UserLandingPage;
