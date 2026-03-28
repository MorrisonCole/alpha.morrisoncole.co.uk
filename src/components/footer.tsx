import React from "react";
import { getYear } from "date-fns";
import styles from "./footer.module.css";

export const Footer: React.FC = () => {
  const currentYear = getYear(new Date());

  return (
    <footer className={styles.footer} role="contentinfo">
      <div
        style={{ display: "flex", flexDirection: "column", gridColumn: "2" }}
      >
        <p>{"Handcrafted with TypeScript, React, and Vite"}</p>
        <p>{`\u{00A9} Morrison Cole ${currentYear}`}</p>
      </div>
    </footer>
  );
};
