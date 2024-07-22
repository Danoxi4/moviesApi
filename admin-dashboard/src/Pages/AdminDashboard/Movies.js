// src/pages/AdminDashboard/Movies.js
import React, { useEffect, useState } from 'react';
import { MoviesContainer, TableHeader, TableData, MovieTable, MovieActions } from '../../styles/movieStyle'
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies from backend
    const fetchMovies = async () => {
      const response = await fetch('http://localhost:1989/api/movies');
      const data = await response.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  return (
    <MoviesContainer>
      <h2>Manage Movies</h2>
      <Link to="/admin/add-movie">Add New Movie</Link>
      <MovieTable>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Title</TableHeader>
            <TableHeader>Genre</TableHeader>
            <TableHeader>Director</TableHeader>
            <TableHeader>Release Date</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id}>
              <TableData>{movie.id}</TableData>
              <TableData>{movie.title}</TableData>
              <TableData>{movie.genre}</TableData>
              <TableData>{movie.director}</TableData>
              <TableData>{movie.releaseDate}</TableData>
              <TableData>
                <MovieActions>
                  <Link to={`/admin/update-movie/${movie.id}`}>Edit</Link>
                  <button onClick={() => handleDelete(movie.id)}>Delete</button>
                </MovieActions>
              </TableData>
            </tr>
          ))}
        </tbody>
      </MovieTable>
    </MoviesContainer>
  );

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      await fetch(`http://localhost:1989/api/movies/${id}`, {
        method: 'DELETE',
      });
      setMovies(movies.filter(movie => movie.id !== id));
    }
  }
};

export default Movies;
