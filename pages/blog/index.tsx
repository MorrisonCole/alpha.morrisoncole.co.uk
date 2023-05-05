import Link from "next/link";
import styled from "styled-components";
import React from "react";
import { meta as fontsFrontMatter } from "./fonts.mdx";
import { meta as lighthouseFrontMatter } from "./lighthouse.mdx";
import { meta as oneYearInJapanFrontMatter } from "./one-year-in-japan.mdx";

const PostButton = styled(Link)`
  color: hsl(340, 59%, 64%);
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

export default function Index() {
  const posts = [
    fontsFrontMatter,
    lighthouseFrontMatter,
    oneYearInJapanFrontMatter,
  ];

  return (
    <>
      {posts.map((post) => (
        <PostButton href={`/blog/${post.slug}`} key={post.slug}>
          {post.title}
        </PostButton>
      ))}
    </>
  );
}
