import React from "react";
import { styled } from "@pigment-css/react";
import { Layout } from "@/components/layout";
import { Locale } from "../i18n-config";
import { getDictionary } from "../get-dictionary";
import { Dictionary } from "../../../types/intl";
import type { Metadata } from "next/types";
import Link from "next/link";

const Title = styled.h1`
  font-size: 4rem;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const Italic = styled.span`
  font-style: italic;
`;

const BoldItalic = styled.span`
  font-weight: bold;
  font-style: italic;
`;

const Japanese = styled.p`
  font-size: 1rem;
  font-family:
    "Noto Sans JP",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Oxygen,
    Ubuntu,
    Cantarell,
    "Open Sans",
    "Helvetica Neue",
    sans-serif;
`;

export const generateMetadata = async ({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> => {
  const { lang } = await params;
  const locale = lang as Locale;
  const dictionary: Dictionary = await getDictionary(locale);

  return {
    title: dictionary.home.title,
    description: dictionary.home.description,
  };
};

const Home = async ({ params }: PageProps<"/[lang]">) => {
  const { lang } = await params;
  const locale = lang as Locale;
  const dictionary: Dictionary = await getDictionary(locale);

  return (
    <Layout lang={locale}>
      <Title>{dictionary.home.header}</Title>
      <p>
        I&apos;m <Bold>bold.</Bold>
      </p>
      <p>
        I&apos;m <Italic>italic.</Italic>
      </p>
      <p>
        I&apos;m <BoldItalic>both!</BoldItalic>
      </p>

      <Japanese>日本語で書いてます。</Japanese>

      <Link href="/blog">Blog</Link>

      <Link href="/life">Life</Link>
    </Layout>
  );
};

export default Home;
