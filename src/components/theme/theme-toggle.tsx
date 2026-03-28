import { useCallback, useEffect, useState } from "react";
import styles from "./theme-toggle.module.css";

const isDark = () => document.documentElement.classList.contains("dark");

export const ThemeToggle = () => {
  const [dark, setDark] = useState(isDark);

  const toggle = useCallback(() => {
    const next = !isDark();
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.classList.toggle("light", !next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  }, []);

  // Sync with OS preference changes when no stored preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        document.documentElement.classList.toggle("dark", e.matches);
        document.documentElement.classList.remove("light");
        setDark(e.matches);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const inactiveTheme = dark ? "light" : "dark";

  return (
    <button
      className={styles["toggleButton"]}
      aria-label={`Change to ${inactiveTheme} mode`}
      title={`Change to ${inactiveTheme} mode`}
      type="button"
      onClick={toggle}
    >
      <span>{dark ? "🌞" : "🌙"}</span>
    </button>
  );
};
