import { useEffect, useState } from "react";
import { DEFAULT_THEME, isValidTheme, type Theme } from "./theme";
import styles from "./theme-toggle.module.css";

export const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>(() => {
    const savedTheme = window.localStorage.getItem("theme");
    return isValidTheme(savedTheme) ? savedTheme : DEFAULT_THEME;
  });

  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  useEffect(() => {
    if (document.documentElement.dataset["theme"] !== activeTheme) {
      document.documentElement.dataset["theme"] = activeTheme;
      window.localStorage.setItem("theme", activeTheme);
    }
  }, [activeTheme]);

  const themeIcon = activeTheme === "light" ? "🌙" : "🌞";

  return (
    <button
      className={styles.toggleButton}
      aria-label={`Change to ${inactiveTheme} mode`}
      title={`Change to ${inactiveTheme} mode`}
      type="button"
      onClick={() => setActiveTheme(inactiveTheme)}
    >
      <span>{themeIcon}</span>
    </button>
  );
};
