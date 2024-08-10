import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #041D56;
  color: #ADE1FB;
`;

const BrandName = styled.h1`
  font-size: 1.5rem;
  color: #ADE1FB;
`;

const SearchBox = styled.input`
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
`;

export { HeaderContainer, BrandName, SearchBox }