import React from "react";
import { styled } from "@pigment-css/react";
import { SwitchLocaleButton } from "./locale/switch-locale-button";
import Logo from "./logo";
import { ThemeToggle } from "./theme/theme-toggle";
import { Locale } from "@/app/i18n-config";
import { getDictionary } from "@/app/get-dictionary";
import { Dictionary } from "../../types/intl";

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

export const Header = async ({ lang }: { lang: Locale }) => {
  const dictionary: Dictionary = await getDictionary(lang);

  return (
    <HeaderContainer role="banner">
      <StyledLogo />
      <ButtonContainer>
        <SwitchLocaleButton
          label={dictionary.misc.switchLanguage}
          locale={lang}
        />
        <ThemeToggle />
      </ButtonContainer>
    </HeaderContainer>
  );
};
