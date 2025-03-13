"use client";

import React, { useEffect, useState } from "react";
import { keyframes, styled } from "@pigment-css/react";
import { DEFAULT_THEME, isValidTheme, type Theme } from "./theme";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ToggleButton = styled.button(({ theme }) => ({
  borderRadius: "3px",
  padding: "0.5rem",
  background: "hsla(0, 0%, 25%, 0.6)",
  color: "hsl(0, 0%, 100%)",
  border: "2px solid white",
  marginLeft: theme.spacing[4],
  marginTop: theme.spacing[4],
  maxWidth: "min-content",
  alignSelf: "flex-end",
  animation: `${fadeIn} 0.8s forwards`,

  "&:hover": {
    filter: "brightness(1.2)",
  },
}));

export const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const savedTheme = document.documentElement.dataset.theme;
    if (isValidTheme(savedTheme)) {
      setActiveTheme(savedTheme);
    } else {
      setActiveTheme(DEFAULT_THEME);
    }
  }, []);

  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    // Only save the theme preference if it was explicity set.
    if (activeTheme && document.documentElement.dataset.theme !== activeTheme) {
      document.documentElement.dataset.theme = activeTheme;
      window.localStorage.setItem("theme", activeTheme);
    }
  }, [activeTheme]);

  if (activeTheme === null) {
    return null;
  }

  const themeIcon = activeTheme === "light" ? "🌙" : "🌞";

  return (
    <ToggleButton
      aria-label={`Change to ${inactiveTheme} mode`}
      title={`Change to ${inactiveTheme} mode`}
      type="button"
      onClick={() => setActiveTheme(inactiveTheme)}
    >
      <span>{themeIcon}</span>
    </ToggleButton>
  );
};
