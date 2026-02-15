import { styled } from "@pigment-css/react";
import React from "react";
import NextImage from "next/image";
import { Button } from "./components/button/button";
import { MDXComponents } from "mdx/types";

type ImageProps = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "placeholder" | "ref"
>;

const Image = ({ alt, src, width, height, ...props }: ImageProps) => (
  <NextImage
    alt={alt ?? "Missing alt"}
    src={typeof src === "string" ? src : "Missing"}
    width={Number(width)}
    height={Number(height)}
    placeholder={"blur"}
    fill
    {...props}
  />
);

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    Button: Button,
    img: Image,
    h1: styled.h1`
      color: hsl(0, 0%, 50%);
      font-size: 3em;
    `,
    p: styled.p``,
    ...components,
  };
};
