import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/movieForm.css';



function MovieForm({ selectedMovie, fetchMovies, clearSelectedMovie }) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [director, setDirector] = useState('');
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    if (selectedMovie) {
      setTitle(selectedMovie.title);
      setGenre(selectedMovie.genre);
      setRating(selectedMovie.rating);
      setReleaseDate(selectedMovie.releaseDate);
      setDirector(selectedMovie.director);
      setPoster(null); // Poster update handled separately
    }
  }, [selectedMovie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('rating', rating);
    formData.append('releaseDate', releaseDate);
    formData.append('director', director);
    if (poster) formData.append('poster', poster);

    try {
      if (selectedMovie) {
        await api.put(`/movies/${selectedMovie.id}`, formData);
      } else {
        await api.post('/movies', formData);
      }
      fetchMovies();
      clearForm();
      clearSelectedMovie();
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  const clearForm = () => {
    setTitle('');
    setGenre('');
    setRating('');
    setReleaseDate('');
    setDirector('');
    setPoster(null);
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h2>{selectedMovie ? 'Update Movie' : 'Add Movie'}</h2>
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
      <input type="submit" value={selectedMovie ? 'Update Movie' : 'Add Movie'} />
    </form>
  );
}

export default MovieForm;
