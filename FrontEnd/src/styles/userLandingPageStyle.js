import styled from 'styled-components';

export const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #01082D;
  
  .content {
    flex: 1;
    padding: 20px;
    text-align: center;
  }
`;



export const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

export const MovieCard = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .movie-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .movie-info {
    padding: 15px;

    .movie-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .movie-details {
      font-size: 14px;
      color: #666;
    }
  }
`;


export const MovieImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;


export const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  margin: 0 5%;
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
