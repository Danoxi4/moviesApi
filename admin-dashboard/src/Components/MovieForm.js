// MovieForm.js
import React, { useState } from 'react';
//import api from '../api'; // Adjust the path as needed
import '../styles/movieForm.css'
import axios from 'axios'

const MovieForm = ({ fetchMovies, clearForm }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [director, setDirector] = useState('');
  const [poster, setPoster] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('rating', rating);
    formData.append('releaseDate', releaseDate);
    formData.append('director', director);
    if (poster) formData.append('poster', poster);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await axios.post('http://localhost:1989/api/movies/upload', formData);
      
    console.log('Upload successful')
      clearForm();
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h2>Add Movie</h2>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="genre">Genre</label>
      <input
        type="text"
        id="genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <label htmlFor="rating">Rating</label>
      <input
        type="text"
        id="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <label htmlFor="releaseDate">Release Date</label>
      <input
        type="date"
        id="releaseDate"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
      />
      <label htmlFor="director">Director</label>
      <input
        type="text"
        id="director"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
      />
      <label htmlFor="poster">Poster</label>
      <input
        type="file"
        id="poster"
        onChange={(e) => setPoster(e.target.files[0])}
      />
      <input type="submit" value="Add Movie" />
    </form>
  );
};

export default MovieForm;
