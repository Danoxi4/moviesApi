import React from 'react';
import { AboutUsContainer, Header, Section, Footer, Title, Subtitle, Paragraph, TeamContainer, TeamMember, MemberPhoto, MemberName, MemberRole } from '../styles/aboutUsStyle';

const AboutUs = () => {
  return (
    <AboutUsContainer>
      <Header>
        <Title>About Us</Title>
      </Header>
      
      <Section>
        <Subtitle>Our Mission</Subtitle>
        <Paragraph>
          Our mission is to be the ultimate destination for movie lovers, providing the most accurate, comprehensive, and engaging movie information available. We aim to:
          <ul>
            <li>Offer an extensive database of movies, including detailed ratings, reviews, and insights.</li>
            <li>Foster a vibrant community where users can share their opinions and connect with others who share their passion for cinema.</li>
            <li>Empower users to make informed decisions about what to watch by providing trustworthy and diverse perspectives.</li>
            <li>Continuously innovate and enhance our platform to meet the evolving needs and preferences of movie enthusiasts worldwide.</li>
          </ul>
        </Paragraph>
      </Section>
      
      <Section>
        <Subtitle>Our Story</Subtitle>
        <Paragraph>
          Founded in 2023, our company has grown from a small startup to a leading provider in the industry. Our journey has been one of innovation, dedication, and customer satisfaction.
        </Paragraph>
      </Section>
      
      <Section>
        <Subtitle>Meet Our Team</Subtitle>
        <TeamContainer>
          <TeamMember>
            <MemberPhoto src="/Founder.jpg" alt="Daniel Alemayehu" />
            <MemberName>Daniel Alemayehu</MemberName>
            <MemberRole>Founder</MemberRole>
          </TeamMember>
          {/* Add more team members as needed */}
        </TeamContainer>
      </Section>
      
      <Footer>
        <Paragraph>&copy; 2024 MovieLand. All rights reserved.</Paragraph>
      </Footer>
    </AboutUsContainer>
  );
};

export default AboutUs;
