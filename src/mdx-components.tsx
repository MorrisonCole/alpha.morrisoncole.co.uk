import { styled } from "@pigment-css/react";
import React from "react";
import Image from "next/image";
import { Button } from "./components/button";
import { MDXComponents } from "mdx/types";

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    Button: Button,
    img: ({
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
    ),
    h1: styled.h1`
      color: hsl(0, 0%, 50%);
      font-size: 3em;
    `,
    p: styled.p``,
    ...components,
  };
};
