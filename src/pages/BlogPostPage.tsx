import React, { lazy, Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "../components/layout";
import { useLocale } from "../LocaleContext";

// Lazy load MDX components
const blogPosts: Record<
  string,
  React.LazyExoticComponent<React.ComponentType>
> = {
  fonts: lazy(() => import("../content/blog/fonts.mdx")),
  lighthouse: lazy(() => import("../content/blog/lighthouse.mdx")),
  "one-year-in-japan": lazy(
    () => import("../content/blog/one-year-in-japan.mdx"),
  ),
};

// Import frontmatter for metadata
import { frontmatter as fontsFrontmatter } from "../content/blog/fonts.mdx";
import { frontmatter as lighthouseFrontmatter } from "../content/blog/lighthouse.mdx";
import { frontmatter as oneYearInJapanFrontmatter } from "../content/blog/one-year-in-japan.mdx";

const frontmatters: Record<string, typeof fontsFrontmatter> = {
  fonts: fontsFrontmatter,
  lighthouse: lighthouseFrontmatter,
  "one-year-in-japan": oneYearInJapanFrontmatter,
};

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLocale();

  if (!slug || !blogPosts[slug]) {
    return <Navigate to={`/${locale}/blog`} replace />;
  }

  const PostContent = blogPosts[slug];
  const meta = frontmatters[slug];

  return (
    <Layout>
      <Helmet>
        <title>{meta?.title ?? "Blog"} | Morrison Cole</title>
        <meta name="description" content={meta?.description ?? ""} />
      </Helmet>
      <Suspense fallback={<div>Loading...</div>}>
        <PostContent />
      </Suspense>
    </Layout>
  );
};
