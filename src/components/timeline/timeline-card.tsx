import React from "react";
import type { Picture, TimelineEntry } from "./timeline-data";
import styles from "./timeline-card.module.css";

const FORMAT_TO_MIME: Record<string, string> = {
  avif: "image/avif",
  webp: "image/webp",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
};

interface TimelineCardProps {
  entry: TimelineEntry;
  loading?: "lazy" | "eager";
}

const CardImage: React.FC<{
  picture: Picture;
  alt: string;
  className?: string;
  loading: "lazy" | "eager";
}> = ({ picture, alt, className, loading }) => (
  <picture>
    {Object.entries(picture.sources).map(([format, srcSet]) => (
      <source
        key={format}
        srcSet={srcSet}
        sizes="(max-width: 640px) 45vw, 400px"
        type={FORMAT_TO_MIME[format] ?? `image/${format}`}
      />
    ))}
    <img
      className={className}
      src={picture.img.src}
      alt={alt}
      width={picture.img.w}
      height={picture.img.h}
      loading={loading}
      decoding={loading === "eager" ? "sync" : "async"}
      {...(loading === "eager" ? { fetchPriority: "high" as const } : {})}
    />
  </picture>
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
          picture={entry.image}
          alt={entry.imageAlt}
          className={`${styles.image} ${styles.lightOnly}`}
          loading={loading}
        />
        <CardImage
          picture={entry.imageDark}
          alt={entry.imageAlt}
          className={`${styles.image} ${styles.darkOnly}`}
          loading={loading}
        />
      </>
    ) : (
      <CardImage
        picture={entry.image}
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
