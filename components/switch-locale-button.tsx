import { useRouter } from "next/router";
import styled from "styled-components";
import React from "react";
import { useIntl } from "react-intl";

const Button = styled.button`
  border-radius: 3px;
  padding: 0.5rem;
  background: hsla(0, 0%, 25%, 0.6);
  color: hsl(0, 0%, 100%);
  border: 2px solid white;
  margin-left: ${(props) => props.theme.spacing[4]};
  margin-top: ${(props) => props.theme.spacing[4]};
  min-width: max-content;

  &:hover {
    filter: brightness(1.2);
  }
`;

export const SwitchLocaleButton = () => {
  const intl = useIntl();
  const text = intl.formatMessage({
    defaultMessage: "日本語",
    id: "K8NcGB",
    description: "Switch language",
  });

  const router = useRouter();
  const { pathname, asPath, query } = router;

  const targetLocale = router.locale === "ja" ? "en" : "ja";

  const handleClick = async () => {
    await router.push({ pathname, query }, asPath, { locale: targetLocale });
  };

  return <Button onClick={handleClick}>{text}</Button>;
};
