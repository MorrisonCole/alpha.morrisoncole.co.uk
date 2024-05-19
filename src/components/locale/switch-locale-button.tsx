"use client";

import React, { useTransition } from "react";
import { LocaleButton } from "./locale-button";
import { Locale } from "@/app/i18n-config";
import { usePathname, useRouter } from "next/navigation";

interface SwitchLocaleButtonProps {
  label: string;
  locale: Locale;
}

export const SwitchLocaleButton = ({
  label,
  locale,
}: SwitchLocaleButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathName = usePathname();

  const targetLocale = locale === "ja" ? "en" : "ja";

  const handleClick = () => {
    const segments = pathName.split("/");
    segments[1] = targetLocale;
    const newPath = segments.join("/");

    startTransition(() => router.replace(newPath));
  };

  return (
    <LocaleButton disabled={isPending} onClick={handleClick}>
      {label}
    </LocaleButton>
  );
};
