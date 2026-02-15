import React, { useTransition } from "react";
import { useLocation } from "react-router-dom";
import { LocaleButton } from "./locale-button";
import { useLocale } from "@/LocaleContext";

interface SwitchLocaleButtonProps {
  label: string;
}

export const SwitchLocaleButton: React.FC<SwitchLocaleButtonProps> = ({
  label,
}) => {
  const [isPending, startTransition] = useTransition();
  const location = useLocation();
  const { locale } = useLocale();

  const targetLocale = locale === "ja" ? "en" : "ja";

  const handleClick = () => {
    const segments = location.pathname.split("/");
    segments[1] = targetLocale;
    const newPath = segments.join("/");

    startTransition(() => {
      // Force a full page reload so that we don't get a flash of unthemed content.
      window.location.href = newPath;
    });
  };

  return (
    <LocaleButton disabled={isPending} onClick={handleClick}>
      {label}
    </LocaleButton>
  );
};
