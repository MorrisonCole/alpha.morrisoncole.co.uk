import {
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components";
import React from "react";

const theme: DefaultTheme = {
  spacing: [
    "0.25rem",
    "0.5rem",
    "0.75rem",
    "1rem",
    "1.5rem",
    "2rem",
    "3rem",
    "4rem",
    "6rem",
    "8rem",
    "12rem",
    "16rem",
    "24rem",
  ],
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <StyledComponentsThemeProvider theme={theme}>
    {children}
  </StyledComponentsThemeProvider>
);
