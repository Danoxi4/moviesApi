// src/styles/GlobalStyle.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    height: 100vh;
    font-family: 'Poppins', sans-serif; /* Use Poppins font */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #01082D; /* Darkest background color */
    color: #ADE1FB; /* Light text color */
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyle;
