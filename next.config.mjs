import withMDX from "@next/mdx";
import { withPigment, extendTheme } from "@pigment-css/nextjs-plugin";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ["tsx", "mdx"],
  reactStrictMode: true,
  poweredByHeader: false,
  i18n: {
    localeDetection: false,
    locales: ["default", "en", "ja"],
    defaultLocale: "default",
    domains: [
      {
        domain: "alpha.morrisoncole.co.uk",
        defaultLocale: "en",
      },
      {
        domain: "alpha.morrisoncole.jp",
        defaultLocale: "ja",
      },
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack(config, { dev }) {
    if (!dev) {
      // https://formatjs.io/docs/guides/advanced-usage#react-intl-without-parser-40-smaller
      config.resolve.alias["@formatjs/icu-messageformat-parser"] =
        "@formatjs/icu-messageformat-parser/no-parser";
    }
    return config;
  },
};

export default withNextIntl(
  withPigment(withMDX(nextConfig), {
    theme: extendTheme({
      spacing: [
        "0.25rem",
        "0.5rem",
        "0.75rem",
        "1rem",
        "1.5rem",
        "2rem",
        "3rem",
        "4rem",
        "6rem",
        "8rem",
        "12rem",
        "16rem",
        "24rem",
      ],
    }),
  }),
);
