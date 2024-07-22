import styled from 'styled-components';

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #041D56;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  color: #ADE1FB;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    background: #041D56;
    padding: 1rem 0;
  }
`;

const NavLink = styled.a`
  color: #ADE1FB;
  margin-left: 2rem;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #266CA9;
  }

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const Spacer = styled.div`
  width: 4rem; /* Adjust width for desired spacing */
`;

const Input = styled.input`
  margin-left: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #266CA9; /* Medium blue border */
  background: #041D56; /* Match navbar background */
  color: #ADE1FB; /* Light blue text */

  @media (max-width: 768px) {
    width: 80%;
    margin: 1rem 0;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Bar = styled.div`
  width: 25px;
  height: 3px;
  background-color: #ADE1FB;
  margin: 3px 0;
`;

export { Bar, Hamburger, NavLink, NavLinks, Logo, Navbar, Input, Spacer }