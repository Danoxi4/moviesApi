import styled from 'styled-components';

export const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  margin: 0 5%;
`;

export const MovieCard = styled.div`
  background-color: #041D56;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export const MovieImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const MovieInfo = styled.div`
  padding: 10px;
  background-color: #041D56;
`;

export const MovieTitle = styled.h3`
  color: #ADE1FB;
  font-size: 1.2rem;
  margin: 0;
`;

export const MovieDetails = styled.p`
  color: #ADE1FB;
  font-size: 0.9rem;
  margin: 5px 0;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5%;
  background-color: #01082D;
  font-family: 'Poppins', sans-serif;
`;

export const BrandName = styled.h1`
  color: #ADE1FB;
  margin: 0;
`;

export const SearchBox = styled.input`
  width: 300px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #266CA9;
  font-family: 'Poppins', sans-serif;
`;

export const MovieActions = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const ActionButton = styled.button`
    background: none;
    border: none;
    color: #ADE1FB;
    cursor: pointer;
    margin-right: 10px; /* Adjust the margin to your preference */

    &:last-child {
    margin-right: 0; /* Remove the margin from the last button */
    }
`;
