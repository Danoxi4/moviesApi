import React from 'react';
import '../styles/header.css';

function Header() {
  return (
    <header className="header">
      <h1>Admin Dashboard</h1>
      <div className="header-actions">
        {/* Add quick actions and notifications here */}
      </div>
    </header>
  );
}

export default Header;