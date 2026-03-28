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
        <p>
          {
            "Crafted with Vite, React, TypeScript (and a little help from my 🤖 friends)"
          }
        </p>
        <p>{`\u{00A9} Morrison Cole ${currentYear}`}</p>
      </div>
    </footer>
  );
};
