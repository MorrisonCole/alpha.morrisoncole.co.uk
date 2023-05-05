import styled from "styled-components";
import React from "react";
import Image from "next/image";
import { Button } from "./components/button";
import { Components } from "@mdx-js/react/lib";

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

export const mdxComponents: Components = {
  Button: Button,
  img: ResponsiveImage,
  h1: h1,
  p: p,
};
