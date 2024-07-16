import styled from 'styled-components';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  background: #041D56; /* Dark blue background */
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-right: 1rem; /* Add margin to the right */
`;

const NavText = styled.span`
  color: #ADE1FB; /* Light blue text */
  margin-left: 1rem;
`;

const NavLink = styled.a`
  color: #ADE1FB; /* Light blue text */
  text-decoration: none;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background: transparent; /* Remove background */
  border: none; /* Remove border */
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #266CA9; /* Medium blue text on hover */
  }
`;

const SearchInput = styled.input`
  width: 150px;
  height: 30px;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  margin-left: 1rem;
`;

module.exports = {
    NavBar,
    NavText,
    NavLink,
    SearchInput
}