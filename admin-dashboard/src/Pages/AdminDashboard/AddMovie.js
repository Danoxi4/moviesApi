// src/pages/AdminDashboard/AddMovie.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  AddMovieContainer, Form } from '../../Styles/dashboardStyles/addMovieStyle'

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:1989/api/movies', {
      method: 'POST',
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
    <AddMovieContainer>
      <h2>Add New Movie</h2>
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
                <button type="submit">Add Movie</button>
      </Form>
    </AddMovieContainer>
  );
};

export default AddMovie;

