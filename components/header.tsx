import styled from "styled-components";
import React from "react";
import { SwitchLocaleButton } from "./switch-locale-button";
import Logo from "./logo";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("../components/theme-toggle"), {
  ssr: false,
});

const HeaderContainer = styled.header`
  grid-area: header;
  padding: ${(props) => props.theme.spacing[4]};
  display: flex;
  flex-direction: row;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: min-content;
`;

export const Header = () => (
  <HeaderContainer role="banner">
    <Logo />
    <ButtonContainer>
      <SwitchLocaleButton />
      <ThemeToggle />
    </ButtonContainer>
  </HeaderContainer>
);
