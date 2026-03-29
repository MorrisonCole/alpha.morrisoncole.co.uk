import React from "react";
import styles from "./responsive-image.module.css";

interface PictureSource {
  src: string;
  w: number;
}

interface Picture {
  sources: Record<string, PictureSource[]>;
  img: { src: string; w: number; h: number };
}

interface ResponsiveImageProps {
  picture: Picture;
  alt: string;
  sizes?: string;
  className?: string;
}

const FORMAT_TO_MIME: Record<string, string> = {
  avif: "image/avif",
  webp: "image/webp",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
};

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  picture,
  alt,
  sizes = "(max-width: 768px) 100vw, 800px",
  className,
}) => (
  <picture>
    {Object.entries(picture.sources).map(([format, images]) => (
      <source
        key={format}
        srcSet={images.map((img) => `${img.src} ${img.w}w`).join(", ")}
        sizes={sizes}
        type={FORMAT_TO_MIME[format] ?? `image/${format}`}
      />
    ))}
    <img
      className={`${styles.image} ${className ?? ""}`.trim()}
      src={picture.img.src}
      alt={alt}
      width={picture.img.w}
      height={picture.img.h}
      loading="lazy"
      decoding="async"
    />
  </picture>
);
