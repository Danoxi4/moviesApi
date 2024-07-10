import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #266CA9;
  background-color: #041D56;
  color: #ADE1FB;
  margin-right: 10px;
`;

const SearchIcon = styled.div`
  color: #ADE1FB;
  cursor: pointer;
`;

const Search = () => {
  return (
    <SearchContainer>
      <SearchInput type="text" placeholder="Search..." />
      <SearchIcon>
        <i className="fa fa-search"></i>
      </SearchIcon>
    </SearchContainer>
  );
};

export default Search;
