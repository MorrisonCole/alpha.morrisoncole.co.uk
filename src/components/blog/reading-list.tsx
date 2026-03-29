import React from "react";
import styles from "./reading-list.module.css";
import { useImageLoaded } from "../use-image-loaded";

export interface BookEntry {
  rating: number;
  title: string;
  author: string;
  link: string;
  imageUrl: string;
}

function Stars({ count }: { count: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= count ? "★" : "☆");
  }
  return <span className={styles.stars}>{stars.join("")}</span>;
}

function BookCover({ src, alt }: { src: string; alt: string }) {
  const { imageRef, isLoaded, handleLoad, handleError } = useImageLoaded(src);

  return (
    <img
      ref={imageRef}
      className={[styles.cover, isLoaded && styles.coverLoaded]
        .filter(Boolean)
        .join(" ")}
      src={src}
      alt={alt}
      width={60}
      height={90}
      loading="lazy"
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}

export const ReadingList: React.FC<{ books: BookEntry[] }> = ({ books }) => {
  const sorted = [...books].sort((a, b) => b.rating - a.rating);

  return (
    <ul className={styles.list}>
      {sorted.map((book) => (
        <li key={book.link}>
          <a
            className={styles.item}
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookCover src={book.imageUrl} alt={book.title} />
            <div className={styles.info}>
              <p className={styles.title}>{book.title}</p>
              <p className={styles.author}>{book.author}</p>
            </div>
            <Stars count={book.rating} />
          </a>
        </li>
      ))}
    </ul>
  );
};
