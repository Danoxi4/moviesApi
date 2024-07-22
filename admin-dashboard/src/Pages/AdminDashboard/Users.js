import React, { useEffect, useState } from 'react';
import { UserTable, TableHeader, TableData, UsersContainer } from '../../Styles/dashboardStyles/usersStyle'


const Users = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      // Fetch users from backend
      const fetchUsers = async () => {
        const response = await fetch('http://localhost:1989/api/users');
        const data = await response.json();
        setUsers(data);
      };
  
      fetchUsers();
    }, []);
  
    return (
      <UsersContainer>
        <h2>View Users</h2>
        <UserTable>
          <thead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>Username</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Favorite Genre</TableHeader>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <TableData>{user.id}</TableData>
                <TableData>{user.username}</TableData>
                <TableData>{user.email}</TableData>
                <TableData>{user.favoriteGenre}</TableData>
              </tr>
            ))}
          </tbody>
        </UserTable>
      </UsersContainer>
    );
  };
  
  export default Users;