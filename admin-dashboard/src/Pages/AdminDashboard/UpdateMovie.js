// src/pages/AdminDashboard/UpdateMovie.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, UpdateMovieContainer } from '../../styles/dashboardStyles/updateMovieStyle'

const UpdateMovie = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`http://localhost:1989/api/movies/${id}`);
      const data = await response.json();
      setTitle(data.title);
      setGenre(data.genre);
      setDirector(data.director);
      setReleaseDate(data.releaseDate);
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:1989/api/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        genre,
        director,
        releaseDate,
      }),
    });

    if (response.ok) {
      navigate('/admin/movies');
    }
  };

  return (
    <UpdateMovieContainer>
      <h2>Update Movie</h2>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Release Date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />
        <button type="submit">Update Movie</button>
      </Form>
    </UpdateMovieContainer>
  );
};

export default UpdateMovie;
