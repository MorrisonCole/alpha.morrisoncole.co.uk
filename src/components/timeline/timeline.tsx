import React from "react";
import type { TimelineEntry } from "./timeline-data";
import { TimelineCard } from "./timeline-card";
import styles from "./timeline.module.css";

interface TimelineProps {
  entries: TimelineEntry[];
}

export const Timeline: React.FC<TimelineProps> = ({ entries }) => (
  <div className={styles.timeline}>
    {entries.map((entry) => (
      <div className={styles.item} key={`${entry.title}-${entry.subtitle1}`}>
        <div className={styles.date}>{entry.date}</div>
        <div className={styles.separator}>
          <span className={styles.dot} />
          <span className={styles.connector} />
        </div>
        <div className={styles.cardWrapper}>
          <TimelineCard entry={entry} />
        </div>
      </div>
    ))}
    <div className={styles.endItem}>
      <div className={styles.separator}>
        <span className={styles.endDot}>★</span>
      </div>
    </div>
  </div>
);
