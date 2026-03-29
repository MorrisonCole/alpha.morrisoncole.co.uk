import React from "react";
import { format, parseISO } from "date-fns";
import styles from "./blog-post.module.css";

interface BlogPostProps {
  title: string;
  date: string;
  children: React.ReactNode;
}

export const BlogPost: React.FC<BlogPostProps> = ({
  title,
  date,
  children,
}) => {
  const formattedDate = format(parseISO(date), "MMMM dd, yyyy");

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <time className={styles.date} dateTime={date}>
          {formattedDate}
        </time>
      </header>
      <section className={styles.body}>{children}</section>
      <hr className={styles.divider} />
    </article>
  );
};
