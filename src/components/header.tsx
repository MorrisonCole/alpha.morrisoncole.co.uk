import React from "react";
import { styled } from "@pigment-css/react";
import { SwitchLocaleButton } from "./locale/switch-locale-button";
import Logo from "./logo";
import { ThemeToggle } from "./theme/theme-toggle";
import { Locale } from "@/app/i18n-config";
import { getDictionary } from "@/app/get-dictionary";
import { Dictionary } from "../../types/intl";
import Image from "next/image";
import profilePicture from "../../public/static/images/morrison-cole.jpg";

const HeaderContainer = styled.header`
  grid-area: header;
  padding: var(--spacing-4);
  display: flex;
  flex-direction: row;
  max-height: 300px;
`;

const StyledLogo = styled(Logo)`
  flex: 7;
`;

const RightContainer = styled.div`
  display: inline-flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  padding-top: var(--spacing-2);
  display: flex;
  flex-direction: row;
  gap: var(--spacing-1);
`;

export const Header = async ({ lang }: { lang: Locale }) => {
  const dictionary: Dictionary = await getDictionary(lang);

  return (
    <HeaderContainer role="banner">
      <StyledLogo />
      <RightContainer>
        <Image
          src={profilePicture}
          alt="Morrison Cole's Profile Picture"
          style={{
            flex: 1,
            maxWidth: "100%",
            height: "auto",
            borderRadius: "50%",
          }}
        />
        <ButtonsContainer>
          <ThemeToggle />
          <SwitchLocaleButton
            label={dictionary.misc.switchLanguage}
            locale={lang}
          />
        </ButtonsContainer>
      </RightContainer>
    </HeaderContainer>
  );
};
