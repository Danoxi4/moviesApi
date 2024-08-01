import styled, { keyframes } from 'styled-components';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const AboutUsContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 50px;
`;

const Section = styled.section`
  margin-bottom: 40px;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #266ca9;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #266ca9;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  color: white;
  list-style-type: disc;
  padding-left: 20px;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 40px;
`;

const TeamMember = styled.div`
  flex: 1 1 30%;
  margin: 10px;
  text-align: center;
`;

const MemberPhoto = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  transition: transform 0.3s ease;
  &:hover {
    animation: ${zoomIn} 0.3s ease;
  }
`;

const MemberName = styled.h3`
  font-size: 1.25rem;
  color: #266ca9;
  margin-top: 15px;
`;

const MemberRole = styled.p`
  font-size: 1rem;
  color: #266ca9;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
  margin-top: 50px;
  animation: ${slideUp} 1s ease-out;
`;

export {
  AboutUsContainer, Header, Section, Footer, Title, Subtitle, Paragraph, TeamContainer, TeamMember, MemberPhoto, MemberName, MemberRole
};
