import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import '../styles/movieList.css';

const API_URL = 'http://localhost:1989/api/movies'; // Define your API URL

function MovieList({ setSelectedMovie }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(API_URL); // Use axios to fetch movies
      setMovies(response.data.data); // Assuming response.data contains the movies array under 'data'
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`); // Use axios to delete a movie
      setMovies(movies.filter(movie => movie._id !== id)); // Assuming movie ID is '_id'
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
              <tr key={movie._id}> {/* Use '_id' as the key */}
                <td>{movie.title}</td>
                <td>{movie.genre}</td>
                <td>{movie.rating}</td>
                <td>{movie.releaseDate}</td>
                <td>{movie.director}</td>
                <td className="actions">
                  <button className="edit" onClick={() => setSelectedMovie(movie)}>Edit</button>
                  <button className="delete" onClick={() => deleteMovie(movie._id)}>Delete</button> {/* Use '_id' for delete */}
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
