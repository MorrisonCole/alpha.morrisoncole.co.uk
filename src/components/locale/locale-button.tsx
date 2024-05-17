import React from "react";
import { styled } from "@pigment-css/react";

const Button = styled.button`
  border-radius: 3px;
  padding: 0.5rem;
  background: hsla(0, 0%, 25%, 0.6);
  color: hsl(0, 0%, 100%);
  border: 2px solid white;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
  min-width: max-content;

  &:hover {
    filter: brightness(1.2);
  }
`;

interface LocaleButtonProps {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const LocaleButton = ({
  disabled,
  onClick,
  children,
}: LocaleButtonProps) => {
  return (
    <Button disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
};
