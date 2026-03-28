import React from "react";
import { Button } from "./components/button/button";
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
    img: Image,
    h1: (props) => <h1 className={styles.h1} {...props} />,
    ...components,
  };
};
