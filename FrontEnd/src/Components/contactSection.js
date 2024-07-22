// src/components/ContactSection.js

import React from 'react';
import { Section, Container, Socials, SocialLink, SignInMessage, SignInButton, ContactHeader } from '../styles/contactSectionStyle'




const ContactSection = () => (
  <Section>
    <Container>
      <ContactHeader>Contact Us</ContactHeader>
      <Socials>
        <hr style={{ border: '1px solid #ADE1FB', marginBottom: '1rem' }} />
        <SocialLink href="https://www.instagram.com" target="_blank">Instagram</SocialLink>
        <SocialLink href="https://www.facebook.com" target="_blank">Facebook</SocialLink>
        <SocialLink href="https://www.twitter.com" target="_blank">Twitter</SocialLink>
        <SocialLink href="https://wa.me" target="_blank">WhatsApp</SocialLink>
        <SocialLink href="mailto:support@movieland.com">Email</SocialLink>
      </Socials>
      <SignInMessage>
        <p>Sign in to access more features and stay updated with the latest movies and reviews.</p>
        <SignInButton href="#">Sign In</SignInButton>
      </SignInMessage>
    </Container>
  </Section>
);

export default ContactSection;
