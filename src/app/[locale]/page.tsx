import React from "react";
import { styled } from "@pigment-css/react";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Layout } from "@/components/layout";

type Props = {
  params: { locale: string };
};

export const generateMetadata = async ({ params: { locale } }: Props) => {
  const translations = await getTranslations({ locale, namespace: "home" });

  return {
    title: translations("title"),
    description: translations("description"),
  };
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

const Home = ({ params: { locale } }: Props) => {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const translations = useTranslations("home");

  return (
    <Layout>
      <Title>{translations("header")}</Title>
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
