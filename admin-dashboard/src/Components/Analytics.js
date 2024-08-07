import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [usersByGenre, setUsersByGenre] = useState([]);
  const [mostLikedMovies, setMostLikedMovies] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersResponse = await axios.get('http://localhost:1989/api/admin/users');
      const moviesResponse = await axios.get('http://localhost:1989/api/movies');
      setUsers(usersResponse.data);
      setMovies(moviesResponse.data);
      processAnalyticsData(usersResponse.data, moviesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const processAnalyticsData = (users, movies) => {
    // Process users by favorite genre
    const genreCounts = users.reduce((acc, user) => {
      acc[user.favoriteGenre] = (acc[user.favoriteGenre] || 0) + 1;
      return acc;
    }, {});

    const usersByGenreData = Object.keys(genreCounts).map(genre => ({
      _id: genre,
      count: genreCounts[genre]
    }));
    setUsersByGenre(usersByGenreData);

    // Process most liked movies
    const sortedMovies = [...movies].sort((a, b) => b.likes - a.likes);
    const mostLikedMoviesData = sortedMovies.slice(0, 10);
    setMostLikedMovies(mostLikedMoviesData);

    // Process movies by genre
    const movieGenreCounts = movies.reduce((acc, movie) => {
      acc[movie.genre] = (acc[movie.genre] || 0) + 1;
      return acc;
    }, {});

    const moviesByGenreData = Object.keys(movieGenreCounts).map(genre => ({
      _id: genre,
      count: movieGenreCounts[genre]
    }));
    setMoviesByGenre(moviesByGenreData);
  };

  return (
    <div className="analytics-container">
      <h2>Analytics</h2>

      <h3>Users by Favorite Genre</h3>
      <PieChart width={400} height={400}>
        <Pie data={usersByGenre} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label>
          {usersByGenre.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <h3>Most Liked Movies</h3>
      <BarChart width={600} height={300} data={mostLikedMovies}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="likes" fill="#8884d8" />
      </BarChart>

      <h3>Movies by Genre</h3>
      <PieChart width={400} height={400}>
        <Pie data={moviesByGenre} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={150} fill="#82ca9d" label>
          {moviesByGenre.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default Analytics;
