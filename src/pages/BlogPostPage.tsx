import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "../components/layout";
import { Breadcrumb } from "../components/blog/breadcrumb";
import { BlogPost } from "../components/blog/blog-post";
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
import AntidepressantsInJapan, {
  frontmatter as antidepressantsFrontmatter,
} from "../content/blog/antidepressants-in-japan/antidepressants-in-japan.mdx";
import DenoV1, {
  frontmatter as denoV1Frontmatter,
} from "../content/blog/deno-v1/deno-v1.mdx";
import JapaneseGovernmentGender, {
  frontmatter as japGovFrontmatter,
} from "../content/blog/japanese-government-gender/japanese-government-gender.mdx";
import LatentSignalApart, {
  frontmatter as latentSignalFrontmatter,
} from "../content/blog/latent-signal-apart/latent-signal-apart.mdx";
import ParapraxisSuiteI, {
  frontmatter as parapraxisFrontmatter,
} from "../content/blog/parapraxis-suite-i/parapraxis-suite-i.mdx";

const blogPosts: Record<string, React.ComponentType> = {
  fonts: Fonts,
  lighthouse: Lighthouse,
  "one-year-in-japan": OneYearInJapan,
  "antidepressants-in-japan": AntidepressantsInJapan,
  "deno-v1": DenoV1,
  "japanese-government-gender-breakdown": JapaneseGovernmentGender,
  "latent-signal-apart": LatentSignalApart,
  "parapraxis-suite-i": ParapraxisSuiteI,
};

const frontmatters: Record<string, typeof fontsFrontmatter> = {
  fonts: fontsFrontmatter,
  lighthouse: lighthouseFrontmatter,
  "one-year-in-japan": oneYearInJapanFrontmatter,
  "antidepressants-in-japan": antidepressantsFrontmatter,
  "deno-v1": denoV1Frontmatter,
  "japanese-government-gender-breakdown": japGovFrontmatter,
  "latent-signal-apart": latentSignalFrontmatter,
  "parapraxis-suite-i": parapraxisFrontmatter,
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
      <Breadcrumb postTitle={meta?.title ?? "Post"} />
      <BlogPost title={meta?.title ?? "Post"} date={meta?.date ?? ""}>
        <PostContent />
      </BlogPost>
    </Layout>
  );
};
