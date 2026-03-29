import React, { useEffect, useRef, useState, useTransition } from "react";
import { useLocation } from "react-router-dom";
import { useLocale } from "../../LocaleContext";
import { i18n, type Locale } from "../../i18n-config";
import styles from "./switch-locale-button.module.css";

const localeLabels: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
};

export const SwitchLocaleButton: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { locale } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (target: Locale) => {
    if (target === locale) {
      setOpen(false);
      return;
    }
    const segments = location.pathname.split("/");
    segments[1] = target;
    const newPath = segments.join("/");

    startTransition(() => {
      window.location.href = newPath;
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        className={styles.button}
        disabled={isPending}
        onClick={() => {
          setOpen((o) => !o);
        }}
        aria-label="Change language"
        aria-expanded={open}
        aria-haspopup="menu"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z" />
          <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31" />
        </svg>
        <svg
          className={styles.caret}
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M3.2 5.7a.5.5 0 0 1 .7 0L8 9.8l4.1-4.1a.5.5 0 0 1 .7.7l-4.5 4.5a.5.5 0 0 1-.7 0L3.2 6.4a.5.5 0 0 1 0-.7" />
        </svg>
      </button>

      {open && (
        <ul className={styles.menu} role="menu">
          {i18n.locales.map((l) => (
            <li key={l} role="menuitem">
              <button
                className={`${styles.menuItem} ${l === locale ? styles.menuItemActive : ""}`}
                onClick={() => {
                  handleSelect(l);
                }}
                type="button"
              >
                {localeLabels[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
