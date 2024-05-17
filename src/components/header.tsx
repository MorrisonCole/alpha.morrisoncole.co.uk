import { styled } from "@pigment-css/react";
import React from "react";
import { SwitchLocaleButton } from "./locale/switch-locale-button";
import Logo from "./logo";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "./theme/theme-toggle";

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

export const Header = () => {
  const translations = useTranslations("misc");

  return (
    <HeaderContainer role="banner">
      <Logo />
      <ButtonContainer>
        <SwitchLocaleButton label={translations("switchLanguage")} />
        <ThemeToggle />
      </ButtonContainer>
    </HeaderContainer>
  );
};
