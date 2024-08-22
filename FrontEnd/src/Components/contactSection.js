import React, { useState } from 'react';
import {
  Section,
  Container,
  Socials,
  SocialLink,
  SignInMessage,
  SignInButton,
  ContactHeader,
  ContactForm, 
  FooterContainer,
  Spacer
} from '../styles/contactSectionStyle';
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa'; // Import icons
import Footer from './footer'
import axios from 'axios';

const ContactSection = () => {


  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1989/api/users/addComment', { name, text });
      alert('Your message has been sent thank you for your feedback!');
        setName('');
      setText('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  }

    return(
  <Section>
     <ContactHeader>Contact Us</ContactHeader>
    <Container>
     
      <Socials>
        <hr style={{ border: '1px solid #ADE1FB', marginBottom: '1rem' }} />
        <SocialLink href="https://www.instagram.com" target="_blank">
          <FaInstagram /> Instagram
        </SocialLink>
        <SocialLink href="https://www.facebook.com" target="_blank">
          <FaFacebook /> Facebook
        </SocialLink>
        <SocialLink href="https://www.twitter.com" target="_blank">
          <FaTwitter /> Twitter
        </SocialLink>
        <SocialLink href="https://wa.me" target="_blank">
          <FaWhatsapp /> WhatsApp
        </SocialLink>
        <SocialLink href="mailto:support@movieland.com">
          <FaEnvelope /> Email
        </SocialLink>
      </Socials>
      <ContactForm>
      <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
            <Spacer />
            <textarea 
              placeholder="Your Comment" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              required 
            />
            <button type="submit" onClick={handleSubmit}>Send</button>
          </form>
      </ContactForm>
    </Container>
       <SignInMessage>
        <p>Sign in to access more features and stay updated with the latest movies and reviews.</p>
        {/* <SignInButton>Sign In</SignInButton> */}
      </SignInMessage>
    <FooterContainer>
        © 2024 MovieLand. All rights reserved.
      </FooterContainer>
  </Section>
)};

export default ContactSection;
