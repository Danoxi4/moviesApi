import styled from 'styled-components';

const UsersContainer = styled.div`
  padding: 20px;
`;

const UserTable = styled.table`
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

export { UserTable, TableHeader, TableData, UsersContainer }