import React from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../../LocaleContext";
import styles from "./breadcrumb.module.css";

interface BreadcrumbProps {
  postTitle: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ postTitle }) => {
  const { locale } = useLocale();

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link to={`/${locale}/blog`} className={styles.link}>
        Blog
      </Link>
      <span className={styles.separator}>/</span>
      <span className={styles.current}>{postTitle}</span>
    </nav>
  );
};
