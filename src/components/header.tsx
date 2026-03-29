import React from "react";
import { SwitchLocaleButton } from "./locale/switch-locale-button";
import Logo from "./logo";
import { ThemeToggle } from "./theme/theme-toggle";
import { GitHubIcon } from "./social/github-icon";
import { LinkedInIcon } from "./social/linkedin-icon";
import { ThreadsIcon } from "./social/threads-icon";
import { StackOverflowIcon } from "./social/stackoverflow-icon";
import styles from "./header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header} role="banner">
      <Logo className={styles.logo} />

      <img
        className={styles.profileImage}
        src="/static/morrison-cole.jpg"
        alt="Morrison Cole"
        width={160}
        height={160}
      />

      <div className={styles.socialRow}>
        <GitHubIcon />
        <LinkedInIcon />
        <ThreadsIcon />
        <StackOverflowIcon />
      </div>

      <div className={styles.controls}>
        <ThemeToggle />
        <SwitchLocaleButton />
      </div>
    </header>
  );
};
