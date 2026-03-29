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
} from "../content/blog/one-year-in-japan/one-year-in-japan.mdx";
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
import ReadingList2019, {
  frontmatter as readingList2019Frontmatter,
} from "../content/blog/2019-reading-list/2019-reading-list.mdx";
import ReadingList2020, {
  frontmatter as readingList2020Frontmatter,
} from "../content/blog/2020-reading-list/2020-reading-list.mdx";
import ReadingList2021, {
  frontmatter as readingList2021Frontmatter,
} from "../content/blog/2021-reading-list/2021-reading-list.mdx";
import ReadingList2022, {
  frontmatter as readingList2022Frontmatter,
} from "../content/blog/2022-reading-list/2022-reading-list.mdx";
import ReadingList2023, {
  frontmatter as readingList2023Frontmatter,
} from "../content/blog/2023-reading-list/2023-reading-list.mdx";

const blogPosts: Partial<Record<string, React.ComponentType>> = {
  fonts: Fonts,
  lighthouse: Lighthouse,
  "one-year-in-japan": OneYearInJapan,
  "antidepressants-in-japan": AntidepressantsInJapan,
  "deno-v1": DenoV1,
  "japanese-government-gender-breakdown": JapaneseGovernmentGender,
  "latent-signal-apart": LatentSignalApart,
  "parapraxis-suite-i": ParapraxisSuiteI,
  "2019-reading-list": ReadingList2019,
  "2020-reading-list": ReadingList2020,
  "2021-reading-list": ReadingList2021,
  "2022-reading-list": ReadingList2022,
  "2023-reading-list": ReadingList2023,
};

const frontmatters: Partial<Record<string, typeof fontsFrontmatter>> = {
  fonts: fontsFrontmatter,
  lighthouse: lighthouseFrontmatter,
  "one-year-in-japan": oneYearInJapanFrontmatter,
  "antidepressants-in-japan": antidepressantsFrontmatter,
  "deno-v1": denoV1Frontmatter,
  "japanese-government-gender-breakdown": japGovFrontmatter,
  "latent-signal-apart": latentSignalFrontmatter,
  "parapraxis-suite-i": parapraxisFrontmatter,
  "2019-reading-list": readingList2019Frontmatter,
  "2020-reading-list": readingList2020Frontmatter,
  "2021-reading-list": readingList2021Frontmatter,
  "2022-reading-list": readingList2022Frontmatter,
  "2023-reading-list": readingList2023Frontmatter,
};

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLocale();

  const PostContent = slug ? blogPosts[slug] : undefined;
  const meta = slug ? frontmatters[slug] : undefined;

  if (!PostContent || !meta) {
    return <Navigate to={`/${locale}/blog`} replace />;
  }

  return (
    <Layout>
      <Helmet>
        <title>{meta.title} | Morrison Cole</title>
        <meta name="description" content={meta.description} />
      </Helmet>
      <Breadcrumb postTitle={meta.title} />
      <BlogPost title={meta.title} date={meta.date}>
        <PostContent />
      </BlogPost>
    </Layout>
  );
};
