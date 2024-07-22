import styled from 'styled-components';
import { Link } from 'react-router-dom';


const AdminNavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background: #f8f9fa;
  border-bottom: 1px solid #ddd;
`;

const AdminNavLink = styled(Link)`
  text-decoration: none;
  color: #266CA9;
  font-weight: bold;

  &:hover {
    color: #0F2573;
  }
`;

export { AdminNavContainer, AdminNavLink }