import React from "react";
import { NavLink } from "react-router-dom";
import { useLocale } from "../../LocaleContext";
import styles from "./navbar.module.css";

export const Navbar: React.FC = () => {
  const { locale } = useLocale();

  return (
    <nav className={styles.nav} role="navigation">
      <NavLink
        to={`/${locale}`}
        end
        className={({ isActive }) =>
          `${styles.tab} ${isActive ? styles.active : ""}`
        }
      >
        Timeline
      </NavLink>
      <NavLink
        to={`/${locale}/blog`}
        className={({ isActive }) =>
          `${styles.tab} ${isActive ? styles.active : ""}`
        }
      >
        Blog
      </NavLink>
    </nav>
  );
};
