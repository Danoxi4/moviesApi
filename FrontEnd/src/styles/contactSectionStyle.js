import styled from 'styled-components';

export const Section = styled.section`
  background-color: #041D56;
  padding: 40px 0;
  width: 100%;
`;

export const Container = styled.div`
  background-color: #041D56;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ContactHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #266ca9;
  font-size: 35px;
`;

export const Socials = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SocialLink = styled.a`
  color: #266CA9;
  text-decoration: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    text-decoration: underline;
  }

  svg {
    font-size: 24px;
  }
`;

export const ContactForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;

  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  textarea {
    height: 100px;
    resize: none;
  }

  button {
    background-color: #266CA9;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #0F2573;
    }
  }
`;

export const SignInMessage = styled.div`
  flex-basis: 100%;
  text-align: center;
  margin-top: auto; /* Push it to the bottom of the container */
  color: #266ca9;

  p {
    margin-bottom: 10px;
  }
`;

export const SignInButton = styled.button`
  background-color: #041D56;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #01082D;
  }
`;

export const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px;
  background-color: #01082D; /* Adjust as needed */
  color: #fff;
  text-align: center;
  box-sizing: border-box;
  font-size: 14px;
  margin-top: 60px; /* Space between form and footer */
`;

export const Spacer = styled.div`
  height: 20px;
`