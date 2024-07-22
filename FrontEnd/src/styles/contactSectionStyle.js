import styled from 'styled-components';

const Section = styled.section`
  width: 180%; /* Add this property */
  padding: 2rem;
  background: #01082D; /* Darkest background color */
  color: #ADE1FB; /* Light blue text */

  @media (max-width: 1200px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Container = styled.div`
  max-width: 1800px; /* Add this property */
  margin: 0 auto; /* Add this property */
  padding: 2rem;
  background: #041D56; /* Dark blue background */
  border-radius: 10px;
  display: flex; /* Add this property */
  flex-direction: column; /* Add this property */
  align-items: center; /* Add this property */

  @media (max-width: 1200px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContactHeader = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ADE1FB; /* Light blue text */
  text-align: center; /* Add this property */

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Socials = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const SocialLink = styled.a`
  color: #ADE1FB; /* Light blue text */
  margin: 0 1rem; /* Add margin to separate links */
  text-decoration: none;
  transition: color 0.3s;
  display: inline-block;
  svg {
    margin-right: 0.5rem; /* Add some space between the icon and text */
  }

  @media (max-width: 768px) {
    margin: 0 0.5rem;
  }
`;

const SignInMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const SignInButton = styled.a`
  background: #266CA9; /* Medium blue background */
  color: #ADE1FB; /* Light blue text */
  padding: 0.5rem 1rem;
  border-radius: 10px; /* Rounded corners */
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s;
  margin-top: 1rem;

  &:hover {
    background: #0F2573; /* Darker blue background */
  }

  @media (max-width: 768px) {
    padding: 0.3rem 0.7rem;
    font-size: 0.9rem;
  }
`;

export { Section, Container, Socials, SocialLink, SignInMessage, SignInButton, ContactHeader };