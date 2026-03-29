import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "../components/layout";
import { useLocale } from "../LocaleContext";
import styles from "./BlogIndexPage.module.css";

import { frontmatter as fontsFrontmatter } from "../content/blog/fonts.mdx";
import { frontmatter as lighthouseFrontmatter } from "../content/blog/lighthouse.mdx";
import { frontmatter as oneYearInJapanFrontmatter } from "../content/blog/one-year-in-japan/one-year-in-japan.mdx";
import { frontmatter as antidepressantsFrontmatter } from "../content/blog/antidepressants-in-japan/antidepressants-in-japan.mdx";
import { frontmatter as denoV1Frontmatter } from "../content/blog/deno-v1/deno-v1.mdx";
import { frontmatter as japGovFrontmatter } from "../content/blog/japanese-government-gender/japanese-government-gender.mdx";
import { frontmatter as latentSignalFrontmatter } from "../content/blog/latent-signal-apart/latent-signal-apart.mdx";
import { frontmatter as parapraxisFrontmatter } from "../content/blog/parapraxis-suite-i/parapraxis-suite-i.mdx";

const allPosts = [
  japGovFrontmatter,
  parapraxisFrontmatter,
  latentSignalFrontmatter,
  fontsFrontmatter,
  oneYearInJapanFrontmatter,
  denoV1Frontmatter,
  antidepressantsFrontmatter,
  lighthouseFrontmatter,
].filter((post) => !post.draft);

// Sort by date descending
allPosts.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const BlogIndexPage: React.FC = () => {
  const { locale } = useLocale();

  return (
    <Layout>
      <Helmet>
        <title>Blog | Morrison Cole</title>
        <meta name="description" content="Blog posts by Morrison Cole" />
      </Helmet>
      <h1>Blog</h1>
      <div className={styles.grid}>
        {allPosts.map((post) => (
          <Link
            to={`/${locale}/blog/${post.slug}`}
            key={post.slug}
            className={styles.card}
          >
            <div className={styles.cardContent}>
              <h2 className={styles.title}>{post.title}</h2>
              <time className={styles.date}>{post.date}</time>
              {post.description && (
                <p className={styles.description}>{post.description}</p>
              )}
              {post.category && (
                <span className={styles.category}>{post.category}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};
