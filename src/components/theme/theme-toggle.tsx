"use client";

import React, { useEffect, useState } from "react";
import { keyframes, styled } from "@pigment-css/react";

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
  const [activeTheme, setActiveTheme] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.dataset.theme || "light";
    }
    return "light";
  });

  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    document.documentElement.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme ?? "light");
  }, [activeTheme]);

  return (
    <ToggleButton
      aria-label={`Change to ${inactiveTheme} mode`}
      title={`Change to ${inactiveTheme} mode`}
      type="button"
      onClick={() => setActiveTheme(inactiveTheme)}
    >
      <span>🌙</span>
    </ToggleButton>
  );
};
