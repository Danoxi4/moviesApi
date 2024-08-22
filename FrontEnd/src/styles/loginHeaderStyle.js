import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Updated to accommodate Navbar and Avatar */
  align-items: center;
  padding: 10px 20px;
  background-color: #266CA9; /* Common background color */
`;

export const Spacer = styled.div`
  width: 10px; /* Adjust the width to your liking */
`;

export const MidSpacer = styled.div`
  width: 200px; /* Adjust the width to your liking */
`

export const BigSpacer = styled.div`
  width: 250px; /* Adjust the width to your liking */
`

export const LogoutButton = styled.button`
  background-color: #0F2573;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #041D56;
  }
`;

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  color: white;
  flex-grow: 1; /* Allows the Navbar to take up available space */
`;

export const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 18px;
  cursor: pointer;
  margin: 0 10px; /* Adds space between links */

  &:hover {
    text-decoration: underline;
  }
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;
