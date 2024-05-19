import withMDX from "@next/mdx";
import { withPigment, extendTheme } from "@pigment-css/nextjs-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    mdxRs: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withPigment(withMDX(nextConfig), {
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
});
