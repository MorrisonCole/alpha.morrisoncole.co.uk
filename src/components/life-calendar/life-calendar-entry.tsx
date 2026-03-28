import React from "react";
import styles from "./life-calendar-entry.module.css";

interface LifeCalendarEntryProps {
  children: string;
  week: Date;
}

export const LifeCalendarEntry = ({
  children,
  week,
}: LifeCalendarEntryProps) => (
  <p className={styles.entry} title={week.toDateString()}>
    {children}
  </p>
);
