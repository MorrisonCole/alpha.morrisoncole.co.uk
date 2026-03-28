import React from "react";
import { SwitchLocaleButton } from "./locale/switch-locale-button";
import Logo from "./logo";
import { ThemeToggle } from "./theme/theme-toggle";
import { useLocale } from "../LocaleContext";
import styles from "./header.module.css";

export const Header: React.FC = () => {
  const { dictionary } = useLocale();

  return (
    <header className={styles.header} role="banner">
      <Logo className={styles.logo} />
      <div className={styles.buttonContainer}>
        <SwitchLocaleButton label={dictionary.misc.switchLanguage} />
        <ThemeToggle />
      </div>
    </header>
  );
};
