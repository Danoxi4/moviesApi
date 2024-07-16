import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh; /* Full screen height */
  padding: 2rem;
  background: #041D56; /* Dark blue background */
  text-align: center;
`;

const MovieTitle = styled.h2`
  margin: 1rem 0;
  font-size: 2rem;
  color: #ADE1FB; /* Light blue text */
`;

const MovieDescription = styled.p`
  margin: 0.5rem 0;
  font-size: 1.2rem;
  color: #266CA9; /* Medium blue text */
`;

module.exports = {  Section,
                    MovieTitle,
                    MovieDescription };
