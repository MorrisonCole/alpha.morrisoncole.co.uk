import createMDX from "@next/mdx";
import { withPigment } from "@pigment-css/nextjs-plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

const withMDX = createMDX();

export default withPigment(withMDX(nextConfig));
