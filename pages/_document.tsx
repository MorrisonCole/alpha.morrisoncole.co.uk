import StyledComponentsRegistry from "@/lib/registry";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
  render() {
    const setColorsByTheme = `
      function getUserPreference() {
        if (window.localStorage.getItem("theme")) {
          return window.localStorage.getItem("theme");
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      document.documentElement.dataset.theme = getUserPreference();
    `;
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/NotoSans-Regular-subset.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/NotoSans-Bold-subset.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/NotoSans-Italic-subset.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/NotoSans-BoldItalic-subset.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: setColorsByTheme }} />
          <StyledComponentsRegistry>
            <Main />
          </StyledComponentsRegistry>
          <NextScript />
        </body>
      </Html>
    );
  }
}
