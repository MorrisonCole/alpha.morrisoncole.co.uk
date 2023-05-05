import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";
import styled from "styled-components";
import fs from "fs/promises";
import path from "path";
import { Button } from "../../components/button";
import Image from "next/image";
import { ALL_POST_PATHS, POSTS_PATH } from "utils/mdx-utils";
import { GetStaticPropsContext } from "next";
import { Layout } from "components/layout";
import { MDXComponents } from "mdx/types";

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

const mdxComponents: MDXComponents = {
  Button: Button,
  img: ResponsiveImage,
  h1: h1,
  p: p,
};

const PostPage = ({ source }: { source: MDXRemoteSerializeResult }) => (
  <Layout>
    <MDXRemote {...source} components={mdxComponents} />
  </Layout>
);
export default PostPage;

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  if (params === undefined) {
    return;
  }

  const sourceFile = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = (await fs.readFile(sourceFile)).toString();

  const mdxSerializeResult = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    parseFrontmatter: true,
  });

  return {
    props: {
      source: mdxSerializeResult,
      frontMatter: mdxSerializeResult.frontmatter,
    },
  };
};

export const getStaticPaths = () => {
  const paths = ALL_POST_PATHS.map((path) =>
    path.replace(/\.mdx?$/, "")
  ).flatMap((slug) => [
    { params: { slug }, locale: "en" },
    { params: { slug }, locale: "ja" },
  ]);

  return {
    paths,
    fallback: false,
  };
};
