import React from "react";
import styles from "./responsive-image.module.css";

interface ResponsiveImageProps {
  picture: string;
  alt: string;
  className?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  picture,
  alt,
  className,
}) => (
  <img
    className={`${styles.image} ${className ?? ""}`.trim()}
    src={picture}
    alt={alt}
    loading="lazy"
    decoding="async"
  />
);
