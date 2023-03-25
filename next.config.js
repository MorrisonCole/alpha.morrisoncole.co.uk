module.exports = {
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx"],
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
