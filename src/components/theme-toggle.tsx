"use client";

import React, { useEffect, useState } from "react";
import { styled } from "@pigment-css/react";

const ToggleButton = styled.button`
  border-radius: 3px;
  padding: 0.5rem;
  background: hsla(0, 0%, 25%, 0.6);
  color: hsl(0, 0%, 100%);
  border: 2px solid white;
  margin-left: ${(props) => props.theme.spacing[4]};
  margin-top: ${(props) => props.theme.spacing[4]};
  max-width: min-content;
  align-self: flex-end;
  animation: fade-in 0.8s forwards;
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &:hover {
    filter: brightness(1.2);
  }
`;

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState(
    document.documentElement.dataset.theme,
  );
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

export default ThemeToggle;
