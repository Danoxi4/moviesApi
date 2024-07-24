// Example for fetching movies
const API_URL = 'http://localhost:5000/movies';

export const fetchMovies = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export default fetchMovies
