import React from "react";
import styles from "./filter-chip.module.css";

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active,
  onClick,
}) => (
  <button
    className={`${styles.chip} ${active ? styles.active : ""}`}
    onClick={onClick}
    type="button"
  >
    {label}
  </button>
);
