import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  background-color: #266CA9; // Adjust color as needed
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const LogoutButton = styled.button`
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

export { HeaderContainer, Avatar, LogoutButton }