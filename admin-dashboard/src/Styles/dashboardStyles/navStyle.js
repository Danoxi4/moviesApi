import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Styled components
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #041D56; /* Dark blue */
  padding: 1rem;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled(NavLink)`
  color: #ADE1FB; /* Light blue */
  margin-right: 2rem;
  text-decoration: none;
  font-size: 1.2rem;

  &.active {
    border-bottom: 2px solid #ADE1FB;
  }

  &:hover {
    color: #266CA9; /* Medium blue */
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #ADE1FB; /* Light blue */
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    color: #266CA9; /* Medium blue */
  }
`;

const Avatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #266CA9; /* Medium blue */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ADE1FB; /* Light blue */
  font-size: 1.2rem;
  margin-right: 1rem;
`;

export { Avatar, LogoutButton, NavItem, NavbarContainer, Nav};