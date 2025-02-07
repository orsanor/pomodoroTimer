import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) =>
      theme.bodyBg || "#2c3e50"}; /* Fallback case */
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${({ theme }) => theme.fontPrimary || "Arial, sans-serif"};
  }
`;

export default GlobalStyle;
