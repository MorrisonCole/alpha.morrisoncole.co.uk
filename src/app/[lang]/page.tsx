import React from "react";
import { styled } from "@pigment-css/react";
import { Layout } from "@/components/layout";
import { Locale } from "../i18n-config";
import { getDictionary } from "../get-dictionary";
import { Dictionary } from "../../../types/intl";

type Props = {
  params: Promise<{ lang: Locale }>;
};

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

const Home = async ({ params }: Props) => {
  const { lang } = await params;
  const dictionary: Dictionary = await getDictionary(lang);

  return (
    <Layout lang={lang}>
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
    </Layout>
  );
};

export default Home;
