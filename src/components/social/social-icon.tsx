import React from "react";
import styles from "./social-icon.module.css";

interface SocialIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

export const SocialIcon: React.FC<SocialIconProps> = ({
  href,
  label,
  children,
}) => (
  <a
    className={styles.link}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
  >
    {children}
  </a>
);
