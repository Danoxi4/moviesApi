import React, { useState } from 'react';
import axios from 'axios';
import '../styles/movieForm.css'; // Import the CSS module

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [director, setDirector] = useState('');
  const [description, setDescription] = useState(''); // New description field
  const [actors, setActors] = useState(['']); // State for actors
  const [poster, setPoster] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const [error, setError] = useState('');

  const handleAddActor = () => {
    setActors([...actors, '']);
  };

  const handleActorChange = (index, value) => {
    const newActors = [...actors];
    newActors[index] = value;
    setActors(newActors);
  };

  const handleRemoveActor = (index) => {
    const newActors = actors.filter((_, i) => i !== index);
    setActors(newActors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clearForm = () => {
      setTitle('');
      setGenre('');
      setRating('');
      setReleaseDate('');
      setDirector('');
      setDescription('');
      setActors(['']);
      setPoster(null);
    };

    try {
      let posterUrl;

      if (poster) {
        const formData = new FormData();
        formData.append('image', poster);

        const imgbbResponse = await axios.post('http://localhost:1989/api/movies/uploadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        posterUrl = imgbbResponse.data.url;
      }

      const movieData = {
        title,
        genre,
        rating,
        releaseDate,
        director,
        description, // Include description
        cast: actors, // Include actors array as cast
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
        <label htmlFor="description">Description</label> {/* New description field */}
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="actors">Actors</label>
        {actors.map((actor, index) => (
          <div key={index} className="actor-input">
            <input
              type="text"
              value={actor}
              onChange={(e) => handleActorChange(index, e.target.value)}
            />
            <button type="button" onClick={() => handleRemoveActor(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddActor}>+ Add Actor</button>

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
