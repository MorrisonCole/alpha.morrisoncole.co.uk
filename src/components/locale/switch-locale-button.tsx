"use client";

import React, { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { LocaleButton } from "./locale-button";

interface SwitchLocaleButtonProps {
  label: string;
}

export const SwitchLocaleButton = ({ label }: SwitchLocaleButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const targetLocale = locale === "ja" ? "en" : "ja";

  const handleClick = () => {
    startTransition(() => router.replace(pathname, { locale: targetLocale }));
  };

  return (
    <LocaleButton disabled={isPending} onClick={handleClick}>
      {label}
    </LocaleButton>
  );
};
