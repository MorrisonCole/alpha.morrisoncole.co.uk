import React from "react";
import { Button } from "../button/button";

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
