// src/components/ContactSection.js

import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  width: 100%;
  padding: 2rem;
  background: #0F2573; /* Medium blue background */
  text-align: center;
  color: #ADE1FB; /* Light blue text */
`;

const ContactSection = () => (
  <Section>
    <h2>Contact Us</h2>
    <p>Email: contact@movieland.com</p>
    <p>Phone: (123) 456-7890</p>
  </Section>
);

export default ContactSection;
