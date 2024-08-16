import styled from 'styled-components';

export const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Adjust spacing between movie cards */
  justify-content: center; /* Centers the grid items */
`;

export const MovieCard = styled.div`
  width: 200px; /* Adjust width as needed */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

export const MovieImage = styled.img`
  width: 100%;
  height: 300px; /* Adjust height as needed */
  object-fit: cover;
`;

export const MovieInfo = styled.div`
  padding: 10px;
`;

export const MovieTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

export const MovieDetails = styled.p`
  font-size: 14px;
  color: #666;
`;


