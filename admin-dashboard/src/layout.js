import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Components/Side-bar';
import Header from './Components/Header';
import './styles/App.css';

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="app">
      {!isLoginPage && <Sidebar />}
      <div className="main-content">
        {!isLoginPage && <Header />}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
