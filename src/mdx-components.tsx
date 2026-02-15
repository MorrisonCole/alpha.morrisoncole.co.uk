import { styled } from "@pigment-css/react";
import React from "react";
import { Button } from "./components/button/button";
import { MDXComponents } from "mdx/types";

type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const Image: React.FC<ImageProps> = ({ alt, src, ...props }) => (
  <StyledImage alt={alt ?? "Missing alt"} src={src} {...props} />
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
