import styled from "styled-components";
import React from "react";
import { SwitchLocaleButton } from "./switch-locale-button";
import Logo from "./logo";

const HeaderContainer = styled.header`
  grid-area: header;
  padding: ${(props) => props.theme.spacing[4]};
  display: flex;
  flex-direction: row;
`;

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <SwitchLocaleButton />
    </HeaderContainer>
  );
}
