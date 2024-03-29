import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import { Layout } from "../components/layout";
import React from "react";
import { loadIntlMessages } from "@/utils/load-intl-messages";
import styled from "styled-components";
import { useIntl } from "react-intl";

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

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    intlMessages: await loadIntlMessages(locale),
  },
});

const Home = () => {
  const intl = useIntl();

  const title = intl.formatMessage({
    defaultMessage: "Morrison Cole - Alpha",
    id: "92K9zb",
    description: "Homepage title",
  });

  const description = intl.formatMessage({
    defaultMessage: "Work in progress.",
    id: "ymbshm",
    description: "Homepage description",
  });

  const pageTitle = intl.formatMessage({
    defaultMessage: "Hello, world.",
    id: "QifQBf",
    description: "Homepage header",
  });

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title>{pageTitle}</Title>
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
    </Layout>
  );
};

export default Home;
