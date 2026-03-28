import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "../components/layout";
import { useLocale } from "../LocaleContext";

import Fonts, {
  frontmatter as fontsFrontmatter,
} from "../content/blog/fonts.mdx";
import Lighthouse, {
  frontmatter as lighthouseFrontmatter,
} from "../content/blog/lighthouse.mdx";
import OneYearInJapan, {
  frontmatter as oneYearInJapanFrontmatter,
} from "../content/blog/one-year-in-japan.mdx";

const blogPosts: Record<string, React.ComponentType> = {
  fonts: Fonts,
  lighthouse: Lighthouse,
  "one-year-in-japan": OneYearInJapan,
};

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
      <PostContent />
    </Layout>
  );
};
