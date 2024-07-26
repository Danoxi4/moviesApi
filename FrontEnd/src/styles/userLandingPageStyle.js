import styled from 'styled-components';

export const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f4f4f4;
  .content {
    flex: 1;
    padding: 20px;
    text-align: center;
  }
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #266CA9;
  padding: 10px;
  color: white;
`;

export const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
