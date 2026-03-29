import React from "react";
import type { TimelineEntry } from "./timeline-data";
import styles from "./timeline-card.module.css";

interface TimelineCardProps {
  entry: TimelineEntry;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ entry }) => (
  <a
    className={styles.card}
    href={entry.mainLink}
    target="_blank"
    rel="noopener noreferrer"
  >
    {entry.imageDark ? (
      <>
        <img
          className={`${styles.image} ${styles.lightOnly}`}
          src={entry.image}
          alt={entry.imageAlt}
          loading="lazy"
          decoding="async"
        />
        <img
          className={`${styles.image} ${styles.darkOnly}`}
          src={entry.imageDark}
          alt={entry.imageAlt}
          loading="lazy"
          decoding="async"
        />
      </>
    ) : (
      <img
        className={styles.image}
        src={entry.image}
        alt={entry.imageAlt}
        loading="lazy"
        decoding="async"
      />
    )}
    <div className={styles.content}>
      <h4 className={styles.title}>{entry.title}</h4>
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
