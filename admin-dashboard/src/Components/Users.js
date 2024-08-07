import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Adjust path as needed
import '../styles/userList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn, isAdmin, token } = useAuth(); // Access auth context

  useEffect(() => {
    const fetchUsers = async () => {
      if (!isLoggedIn || !isAdmin) {
        setError('Unauthorized access');
        setLoading(false);
        return;
      }

      console.log(token)
      try {
        const response = await axios.get('http://localhost:1989/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}` // Add Authorization header
          }
        });
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isLoggedIn, isAdmin, token]); // Dependency array

  const handleEdit = (id) => {
    // Handle edit user
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1989/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Add Authorization header
        }
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-list">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td className="actions">
                <button className="edit" onClick={() => handleEdit(user.id)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
