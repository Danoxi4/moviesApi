import styled, { keyframes } from 'styled-components';


const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 2rem;
  background: #01082D;
  text-align: center;
  position: relative;
`;

const IntroText = styled.div`
  margin-top: 2rem;
  h1 {
    font-size: 6.5rem;
    margin-bottom: 1rem;
    color: #ADE1FB;
    @media (max-width: 768px) {
      font-size: 4rem;
    }
    @media (max-width: 480px) {
      font-size: 2.5rem;
    }
  }
  p {
    font-size: 1.2rem;
    color: #266CA9;
    @media (max-width: 768px) {
      font-size: 1rem;
    }
    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;

const spotlightAnimation = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
`;

const Spotlight = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background-color: #FFD700; /* Golden yellow */
  border-radius: 50%;
  animation: ${spotlightAnimation} 5s linear infinite;
`;

const popcornAnimation = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
`;

const Popcorn = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #F7DC6F; /* Light yellow */
  border-radius: 50%;
  animation: ${popcornAnimation} 8s linear infinite;

  &:nth-child(2) {
    left: 20%;
    animation-delay: 2s;
  }

  &:nth-child(3) {
    left: 40%;
    animation-delay: 4s;
  }

  /* Add more pseudo-elements for additional popcorn */
`;

export {
    Section,
    IntroText,
    Spotlight,
    Popcorn
}