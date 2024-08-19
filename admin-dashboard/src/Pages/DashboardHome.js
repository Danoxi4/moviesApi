import React from 'react';
import '../styles/dashboard.css';  // Ensure you import the correct path to the CSS file

const DashboardHome = () => {
  return (
    <div className="dashboardContainer">
      <h1 className="pageContent fadeInSlide">Dashboard Home</h1>
      <p className="pageContent fadeInSlide">Welcome to the dashboard. Here you can view statistics and manage content.</p>
      
    </div>
  );
};

export default DashboardHome;
