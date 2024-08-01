import styled from 'styled-components';



const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.bgColor};
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
`;

export { AvatarContainer }
