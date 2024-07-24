import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/movieList.css';

function MovieList({ setSelectedMovie }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await api.get('/movies');
      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await api.delete(`/movies/${id}`);
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div className="movie-list">
      <h2>Movies</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Release Date</th>
              <th>Director</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.genre}</td>
                <td>{movie.rating}</td>
                <td>{movie.releaseDate}</td>
                <td>{movie.director}</td>
                <td className="actions">
                  <button className="edit" onClick={() => setSelectedMovie(movie)}>Edit</button>
                  <button className="delete" onClick={() => deleteMovie(movie.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MovieList;
