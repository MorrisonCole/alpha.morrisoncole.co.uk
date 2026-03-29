import React from "react";
import styles from "./timeline-intro.module.css";

export const TimelineIntro: React.FC = () => (
  <div className={styles.intro}>
    <h1 className={styles.greeting}>Hello! 👋</h1>
    <p className={styles.bio}>
      I&apos;m a software engineer, ex-product manager, and (occasional)
      musician living in Tokyo.
    </p>
    <a
      className={styles.cvButton}
      href="/downloads/cv.pdf"
      download="cv-morrison-cole.pdf"
    >
      CV (.PDF)
    </a>
  </div>
);
