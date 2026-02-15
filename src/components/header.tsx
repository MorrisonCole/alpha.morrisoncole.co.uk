import React from "react";
import { styled } from "@pigment-css/react";
import { SwitchLocaleButton } from "./locale/switch-locale-button";
import Logo from "./logo";
import { ThemeToggle } from "./theme/theme-toggle";
import { useLocale } from "@/LocaleContext";

const HeaderContainer = styled.header`
  grid-area: header;
  padding: var(--spacing-4);
  display: flex;
  flex-direction: row;
  max-height: 300px;
`;

const StyledLogo = styled(Logo)`
  flex: 6;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: min-content;
`;

export const Header: React.FC = () => {
  const { dictionary } = useLocale();

  return (
    <HeaderContainer role="banner">
      <StyledLogo />
      <ButtonContainer>
        <SwitchLocaleButton label={dictionary.misc.switchLanguage} />
        <ThemeToggle />
      </ButtonContainer>
    </HeaderContainer>
  );
};
