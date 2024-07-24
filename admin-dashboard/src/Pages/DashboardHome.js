import React from 'react';
import styles from '../styles/dashboard.css';  // Import the CSS module

const DashboardHome = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.pageContent}>Dashboard Home</h1>
      <p className={styles.pageContent}>Welcome to the dashboard. Here you can view statistics and manage content.</p>
      {/* Add more content as needed */}
    </div>
  );
};

export default DashboardHome;
