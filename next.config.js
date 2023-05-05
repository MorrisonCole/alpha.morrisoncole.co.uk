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

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

module.exports = withMDX(nextConfig);
