import React, { useState } from 'react';
import axios from 'axios';
import '../styles/movieForm.css'; // Import the CSS module

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [director, setDirector] = useState('');
  const [poster, setPoster] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clearForm = () => {
      setTitle('');
      setGenre('');
      setRating('');
      setReleaseDate('');
      setDirector('');
      setPoster(null);
    };

    try {
      const response = await axios.get('http://localhost:1989/api/movies');
      const existingMovies = response.data.data;

      const isDuplicate = existingMovies.some(movie => movie.title.toLowerCase() === title.toLowerCase());

      if (isDuplicate) {
        setError('Movie already exists');
        setShowPopover(true);
        clearForm();
        return;
      }

      // Log poster file to check if it's correctly set
      console.log('Poster file:', poster);

      let posterUrl;

      if (poster) {
        const formData = new FormData();
        formData.append('image', poster);

        const imgbbResponse = await axios.post('https://api.imgbb.com/1/upload?key=77f62320835016fbf64d6ea01d8948e4', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        posterUrl = imgbbResponse.data.data.url;
        console.log(posterUrl);
      }

      // Prepare movie data
      const movieData = {
        title,
        genre,
        rating,
        releaseDate,
        director,
        poster: posterUrl,
      };

      await axios.post('http://localhost:1989/api/movies/upload', movieData);
      console.log('Upload successful');

      clearForm();
    } catch (error) {
      console.error('Error saving movie:', error);
      setError('An error occurred while saving the movie');
      setShowPopover(true);
    }
  };

  return (
    <>
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

      {showPopover && (
        <div className="popover">
          <div className="popoverContent">
            <span className="closeButton" onClick={() => setShowPopover(false)}>
              &times;
            </span>
            <p>{error}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieForm;