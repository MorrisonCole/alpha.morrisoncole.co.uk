import React from "react";
import { Button } from "./components/button/button";
import { SpotifyAlbum, SpotifyTrack } from "./components/blog/spotify-embed";
import type { MDXComponents } from "mdx/types";
import styles from "./mdx-components.module.css";

type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const Image: React.FC<ImageProps> = ({ alt, src, ...props }) => (
  <img
    className={styles.image}
    alt={alt ?? "Missing alt"}
    src={src}
    {...props}
  />
);

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    Button: Button,
    SpotifyAlbum: SpotifyAlbum,
    SpotifyTrack: SpotifyTrack,
    img: Image,
    h1: (props) => <h1 className={styles.h1} {...props} />,
    h2: (props) => <h2 className={styles.h2} {...props} />,
    h3: (props) => <h3 className={styles.h3} {...props} />,
    h4: (props) => <h4 className={styles.h4} {...props} />,
    blockquote: (props) => (
      <blockquote className={styles.blockquote} {...props} />
    ),
    a: (props) => <a className={styles.link} {...props} />,
    pre: (props) => <pre className={styles.pre} {...props} />,
    code: (props) => <code className={styles.code} {...props} />,
    ...components,
  };
};
