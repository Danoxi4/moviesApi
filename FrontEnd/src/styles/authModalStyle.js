import styled from 'styled-components';


const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;   /* High z-index to ensure it stays on top */
`;

const ModalContent = styled.div`
  background: #041D56; /* Dark blue background */
  color: #ADE1FB; /* Light blue text */
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const LinkButton = styled.a`
  background: #266CA9; /* Medium blue background */
  color: #ADE1FB; /* Light blue text */
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px; /* Rounded corners */
  cursor: pointer;
  transition: background 0.3s;
  text-decoration: none;

  &:hover {
    background: #0F2573; /* Darker blue background */
  }
`;

const TabButton = styled.button`
  background: ${({ active }) => (active ? '#266CA9' : '#0F2573')}; /* Conditional background color */
  color: #ADE1FB; /* Light blue text */
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 0.5rem;
  transition: background 0.3s;

  &:hover {
    background: #041D56; /* Dark blue background */
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  input, select {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #266CA9; /* Medium blue border */
    width: 100%;
    background: #041D56; /* Match modal background */
    color: #ADE1FB; /* Light blue text */
  }
`;

export const ForgotPasswordLink = styled.a`
  display: block;
  margin-top: 10px;
  color: #007BFF; /* Adjust color as needed */
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #0056b3; /* Adjust hover color as needed */
  }
`;

export {
    ModalBackground,
    ModalContent,
    ButtonRow,
    LinkButton,
    TabButton,
    Form
}