import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #01082D; /* Dark background color */
  color: #ADE1FB; /* Light text color */
`;

const Header = styled.header`
  padding: 1rem 2rem;
  background: #041D56; /* Dark blue header */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Footer = styled.footer`
  padding: 1rem 2rem;
  background: #041D56; /* Dark blue footer */
  text-align: center;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
`;

const MovieCard = styled.div`
  background: ${({ bgImage }) => `url(${bgImage}) no-repeat center center`};
  background-size: cover;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #ADE1FB;
  height: 300px; /* Fixed height for movie cards */
  text-align: center;
  position: relative;
`;

const MovieDetails = styled.div`
  background: rgba(0, 0, 0, 0.7); /* Semi-transparent background for text */
  padding: 1rem;
  border-radius: 0 0 10px 10px;
  width: 100%;
`;

const MovieTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const MovieRating = styled.span`
  font-size: 1rem;
  color: #FFD700; /* Gold color for rating */
`;

const MovieGenre = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
`;

const MovieDirector = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
`;

const RemoveButton = styled.button`
  background: #FF0000; /* Red background */
  color: #FFF; /* White text */
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.3s;

  &:hover {
    background: #CC0000; /* Darker red background */
  }
`;

module.exports = {
    PageContainer,
    Header,
    Body,
    Footer,
    MoviesGrid,
    MovieCard,
    MovieDetails,
    MovieTitle,
    MovieRating,
    MovieGenre,
    MovieDirector,
    RemoveButton
}