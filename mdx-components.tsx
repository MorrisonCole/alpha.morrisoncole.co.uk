import styled from "styled-components";
import React from "react";
import Image from "next/image";
import { MDXComponents } from "mdx/types";
import { Button } from "./components/button";

const h1 = styled.h1`
  color: hsl(0, 0%, 50%);
  font-size: 3em;
`;

const p = styled.p``;

const ResponsiveImage = ({
  alt,
  src,
  width,
  height,
  ...props
}: Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "placeholder" | "ref"
>) => (
  <Image
    alt={alt ?? "Missing alt"}
    src={src ?? "Missing"}
    width={Number(width)}
    height={Number(height)}
    placeholder={"blur"}
    fill
    {...props}
  />
);

export const useMDXComponents = (components: MDXComponents) => {
  return {
    Button: Button,
    img: ResponsiveImage,
    h1: h1,
    p: p,
    ...components,
  };
};
