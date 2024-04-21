"use client";

import React, { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigation";

// const Button = styled.button`
//   border-radius: 3px;
//   padding: 0.5rem;
//   background: hsla(0, 0%, 25%, 0.6);
//   color: hsl(0, 0%, 100%);
//   border: 2px solid white;
//   margin-left: 1.5rem;
//   margin-top: 1.5rem;
//   min-width: max-content;

//   &:hover {
//     filter: brightness(1.2);
//   }
// `;

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
    <button disabled={isPending} onClick={handleClick}>
      {label}
    </button>
  );
};
