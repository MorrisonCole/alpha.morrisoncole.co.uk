import styled from "styled-components";
import React from "react";
import { SwitchLocaleButton } from "./switch-locale-button";

const HeaderContainer = styled.header`
  grid-area: header;
  padding: ${(props) => props.theme.spacing[4]};
`;

export function Header() {
  return (
    <HeaderContainer>
      <SwitchLocaleButton />
    </HeaderContainer>
  );
}
