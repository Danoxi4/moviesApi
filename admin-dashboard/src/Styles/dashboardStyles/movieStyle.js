import styled from 'styled-components';

const MoviesContainer = styled.div`
  padding: 20px;
`;

const MovieTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const MovieActions = styled.div`
  display: flex;
  gap: 10px;
`;

export { MoviesContainer, TableHeader, TableData, MovieTable, MovieActions }