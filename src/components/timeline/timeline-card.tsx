import React from "react";
import type { TimelineEntry } from "./timeline-data";
import styles from "./timeline-card.module.css";

interface TimelineCardProps {
  entry: TimelineEntry;
  loading?: "lazy" | "eager";
}

const CardImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  loading: "lazy" | "eager";
}> = ({ src, alt, className, loading }) => (
  <img
    className={className}
    src={src}
    alt={alt}
    loading={loading}
    decoding={loading === "eager" ? "sync" : "async"}
    {...(loading === "eager" ? { fetchPriority: "high" as const } : {})}
  />
);

export const TimelineCard: React.FC<TimelineCardProps> = ({
  entry,
  loading = "lazy",
}) => (
  <a
    className={styles.card}
    href={entry.mainLink}
    target="_blank"
    rel="noopener noreferrer"
  >
    {entry.imageDark ? (
      <>
        <CardImage
          src={entry.image}
          alt={entry.imageAlt}
          className={`${styles.image} ${styles.lightOnly}`}
          loading={loading}
        />
        <CardImage
          src={entry.imageDark}
          alt={entry.imageAlt}
          className={`${styles.image} ${styles.darkOnly}`}
          loading={loading}
        />
      </>
    ) : (
      <CardImage
        src={entry.image}
        alt={entry.imageAlt}
        className={styles.image}
        loading={loading}
      />
    )}
    <div className={styles.content}>
      <h2 className={styles.title}>{entry.title}</h2>
      <p className={styles.subtitle}>
        {entry.subtitle1}
        {entry.subtitle2 && (
          <span className={styles.subtitle2}> {entry.subtitle2}</span>
        )}
      </p>
      <p className={styles.text}>{entry.text}</p>
    </div>
  </a>
);
