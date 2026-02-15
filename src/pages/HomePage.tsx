import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { styled } from "@pigment-css/react";
import { Layout } from "../components/layout";
import { useLocale } from "../LocaleContext";

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

export const HomePage: React.FC = () => {
  const { locale, dictionary } = useLocale();

  return (
    <Layout>
      <Helmet>
        <title>{dictionary.home.title}</title>
        <meta name="description" content={dictionary.home.description} />
      </Helmet>
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

      <Link
        to={`/${locale}/blog`}
        style={{ display: "block", margin: "0.5rem 0" }}
      >
        Blog
      </Link>
      <Link
        to={`/${locale}/life`}
        style={{ display: "block", margin: "0.5rem 0" }}
      >
        Life
      </Link>
    </Layout>
  );
};
