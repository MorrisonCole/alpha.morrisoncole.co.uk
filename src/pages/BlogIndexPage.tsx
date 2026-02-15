import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "../components/layout";
import { useLocale } from "../LocaleContext";

// Import frontmatter from MDX files
import { frontmatter as fontsFrontmatter } from "../content/blog/fonts.mdx";
import { frontmatter as lighthouseFrontmatter } from "../content/blog/lighthouse.mdx";
import { frontmatter as oneYearInJapanFrontmatter } from "../content/blog/one-year-in-japan.mdx";

const posts = [
  fontsFrontmatter,
  lighthouseFrontmatter,
  oneYearInJapanFrontmatter,
];

export const BlogIndexPage: React.FC = () => {
  const { locale } = useLocale();

  return (
    <Layout>
      <Helmet>
        <title>Blog | Morrison Cole</title>
        <meta name="description" content="Blog posts by Morrison Cole" />
      </Helmet>
      <h1>Blog</h1>
      {posts.map((post) => (
        <Link
          to={`/${locale}/blog/${post.slug}`}
          key={post.slug}
          style={{ display: "block", margin: "1rem 0", fontSize: "1.25rem" }}
        >
          {post.title}
        </Link>
      ))}
    </Layout>
  );
};
