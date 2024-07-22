import React from 'react';
import { DashboardContainer, DashboardHeader } from '../../styles/dashboardStyles/dashboardStyle'
import AdminNav from './AdminNav';


const Dashboard = () => {
    return (
      <DashboardContainer>
        <DashboardHeader>Admin Dashboard</DashboardHeader>
        <AdminNav />
      </DashboardContainer>
    );
  };
  
  export default Dashboard;