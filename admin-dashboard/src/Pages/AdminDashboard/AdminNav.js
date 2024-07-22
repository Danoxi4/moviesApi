import React from 'react';
import { AdminNavContainer, AdminNavLink } from '../../styles/dashboardStyles/adminNavStyle'


const AdminNav = () => {
    return (
      <AdminNavContainer>
        <AdminNavLink to="/admin/users">View Users</AdminNavLink>
        <AdminNavLink to="/admin/movies">Manage Movies</AdminNavLink>
        <AdminNavLink to="/admin/analytics">Analytics</AdminNavLink>
      </AdminNavContainer>
    );
  };
  
  export default AdminNav;