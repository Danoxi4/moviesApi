import styled from 'styled-components';


const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.bgColor};
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-left: 20px;
  border-radius: 70%;
`;

export { AvatarContainer }
