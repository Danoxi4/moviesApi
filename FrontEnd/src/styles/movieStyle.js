import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem;
  background: #01082D; /* Darkest background color */
  color: #ADE1FB; /* Light blue text */
  position: relative;

  @media (max-width: 1200px) {
    padding: 1rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const MoviesWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap; /* Add this property */
  overflow-x: auto;
  width: 100%;
  justify-content: center;
  padding: 1rem;
  padding-bottom: 2rem; /* Extra padding for bottom space */

  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #041D56; /* Dark blue track */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #266CA9; /* Medium blue thumb */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #0F2573; /* Darker blue thumb on hover */
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const MovieCard = styled.div`
  min-width: 320px; /* Increased width to prevent cutting */
  margin: 0 1rem;
  margin-right: 20px; /* Add margin-right to create a gap between cards */
  background: #041D56;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0; /* Prevent cards from shrinking */

  @media (max-width: 768px) {
    min-width: 250px;
    margin: 0.5rem;
    margin-right: 10px;
  }

  @media (max-width: 480px) {
    min-width: 200px;
    margin: 0.2rem;
    margin-right: 5px;
  }
`;

const MovieImage = styled.div`
  height: 400px;
  background: url('https://via.placeholder.com/300x400') center/cover no-repeat;

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

const MovieInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;

  @media (max-width: 768px) {
    padding: 0.5rem;
    height: 150px;
  }

  @media (max-width: 480px) {
    padding: 0.2rem;
    height: 100px;
  }
`;

const MovieTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #ADE1FB;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const MovieDetails = styled.p`
  margin: 0.5rem 0;
  color: #266CA9; /* Medium blue text */

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ViewAllButton = styled.a`
  margin-top: 1rem;
  align-self: flex-end;
  background: #266CA9; /* Medium blue background */
  color: #ADE1FB; /* Light blue text */
  padding: 0.5rem 1rem;
  border-radius: 10px; /* Rounded corners */
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: #0F2573; /* Darker blue background */
  }

  @media (max-width: 768px) {
    padding: 0.3rem 0.7rem;
    font-size: 0.9rem;
  }
`;

export {  Section,
          MovieCard,
          MovieImage,
          MovieInfo,
          MovieTitle,
          MovieDetails,
          MoviesWrapper,
          ViewAllButton };
