import React from "react";
import { SwitchLocaleButton } from "./locale/switch-locale-button";
import Logo from "./logo";
import { ThemeToggle } from "./theme/theme-toggle";
import { GitHubIcon } from "./social/github-icon";
import { LinkedInIcon } from "./social/linkedin-icon";
import { ThreadsIcon } from "./social/threads-icon";
import { StackOverflowIcon } from "./social/stackoverflow-icon";
import profilePic from "../assets/morrison-cole.jpg?w=160;320&format=avif;webp;jpg&as=picture";
import styles from "./header.module.css";

const FORMAT_TO_MIME: Record<string, string> = {
  avif: "image/avif",
  webp: "image/webp",
  jpg: "image/jpeg",
};

export const Header: React.FC = () => {
  return (
    <header className={styles.header} role="banner">
      <Logo className={styles.logo} />

      <picture className={styles.profilePicture}>
        {Object.entries(profilePic.sources ?? {}).map(([format, srcSet]) => (
          <source
            key={format}
            srcSet={srcSet}
            sizes="(max-width: 640px) 64px, 160px"
            type={FORMAT_TO_MIME[format] ?? `image/${format}`}
          />
        ))}
        <img
          className={styles.profileImage}
          src={profilePic.img?.src}
          alt="Morrison Cole"
          width={profilePic.img?.w}
          height={profilePic.img?.h}
          decoding="async"
        />
      </picture>

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
