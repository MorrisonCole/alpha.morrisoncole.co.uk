import React from "react";
import styles from "./mdx-components.module.css";
import { useImageLoaded } from "./components/use-image-loaded";

type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export const MdxImage: React.FC<ImageProps> = ({ alt, src, ...props }) => (
  <MdxImageInner alt={alt} src={src} {...props} />
);

const MdxImageInner: React.FC<ImageProps> = ({
  alt,
  className,
  onError,
  onLoad,
  src,
  ...props
}) => {
  const { imageRef, isLoaded, handleLoad, handleError } = useImageLoaded(src);

  return (
    <img
      ref={imageRef}
      className={[styles.image, isLoaded && styles.loaded, className]
        .filter(Boolean)
        .join(" ")}
      alt={alt ?? "Missing alt"}
      src={src}
      loading="lazy"
      decoding="async"
      onLoad={(event) => {
        handleLoad(event);
        onLoad?.(event);
      }}
      onError={(event) => {
        handleError(event);
        onError?.(event);
      }}
      {...props}
    />
  );
};

export const MdxH1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h1
    className={[styles.h1, styles.heading, className].filter(Boolean).join(" ")}
    {...props}
  />
);

export const MdxH2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h2
    className={[styles.h2, styles.heading, className].filter(Boolean).join(" ")}
    {...props}
  />
);

export const MdxH3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h3
    className={[styles.h3, styles.heading, className].filter(Boolean).join(" ")}
    {...props}
  />
);

export const MdxH4: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h4
    className={[styles.h4, styles.heading, className].filter(Boolean).join(" ")}
    {...props}
  />
);

export const MdxBlockquote: React.FC<
  React.BlockquoteHTMLAttributes<HTMLQuoteElement>
> = (props) => <blockquote className={styles.blockquote} {...props} />;

export const MdxLink: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
> = (props) => <a className={styles.link} {...props} />;

export const MdxPre: React.FC<React.HTMLAttributes<HTMLPreElement>> = (
  props,
) => <pre className={styles.pre} {...props} />;

export const MdxCode: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => (
  <code className={styles.code} {...props} />
);
