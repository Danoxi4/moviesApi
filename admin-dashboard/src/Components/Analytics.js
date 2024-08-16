import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const [usersByGenre, setUsersByGenre] = useState([]);
  const [mostLikedMovies, setMostLikedMovies] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // Fetch users by favorite genre
      const usersByGenreResponse = await axios.get('http://localhost:1989/api/admin/usersBbyGenre');
      setUsersByGenre(usersByGenreResponse.data);

      // Fetch most liked movies
      const mostLikedMoviesResponse = await axios.get('http://localhost:1989/api/admin/mostLikedMovies');
      setMostLikedMovies(mostLikedMoviesResponse.data);

      // Fetch movies by genre
      const moviesByGenreResponse = await axios.get('http://localhost:1989/api/admin/moviesByGenre');
      setMoviesByGenre(moviesByGenreResponse.data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
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
