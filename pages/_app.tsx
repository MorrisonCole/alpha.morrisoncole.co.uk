import type { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "../components/theme-provider";
import { createGlobalStyle } from "styled-components";
import { useRouter } from "next/router";
import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "../mdx-components";

// From: https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=optional
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-display: optional;
    src: local(''), url('/fonts/NotoSans-Regular-subset.woff2') format('woff2');
    unicode-range: U+20, U+21, U+27, U+2C, U+2E, U+43, U+48, U+49, U+4D, U+61-65, U+68, U+69, U+6C-6F, U+72-74, U+77;
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-display: optional;
    src: local(''), url('/fonts/NotoSans-Bold-subset.woff2') format('woff2');
    unicode-range: U+20, U+21, U+27, U+2C, U+2E, U+43, U+48, U+49, U+4D, U+61-65, U+68, U+69, U+6C-6F, U+72-74, U+77;
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: italic;
    font-weight: 400;
    font-display: optional;
    src: local(''), url('/fonts/NotoSans-Italic-subset.woff2') format('woff2');
    unicode-range: U+20, U+21, U+27, U+2C, U+2E, U+43, U+48, U+49, U+4D, U+61-65, U+68, U+69, U+6C-6F, U+72-74, U+77;
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: italic;
    font-weight: 700;
    font-display: optional;
    src: local(''), url('/fonts/NotoSans-BoldItalic-subset.woff2') format('woff2');
    unicode-range: U+20, U+21, U+27, U+2C, U+2E, U+43, U+48, U+49, U+4D, U+61-65, U+68, U+69, U+6C-6F, U+72-74, U+77;
  }

  body {
    margin: 0;
    font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background-color: hsl(0, 0%, 6%);
    color: hsl(0, 0%, 100%);
  }

  html[data-theme="light"] {
    color-scheme: light;
    --color-background: hsl(0, 0%, 100%);
    --color-logo-1: hsl(240, 6%, 15%);
    --color-logo-2: hsl(214, 26%, 52%);
    --color-logo-3: hsl(57, 26%, 54%);
    --color-logo-4: hsl(240, 7%, 27%);
    --color-logo-5: hsl(213, 16%, 39%);
    --color-text: hsl(0, 0%, 0%);
  }

  html[data-theme="dark"] {
    color-scheme: dark;
    --color-background: hsl(0, 0%, 6%);
    --color-logo-1: hsl(240, 6%, 15%);
    --color-logo-2: hsl(214, 26%, 52%);
    --color-logo-3: hsl(57, 26%, 54%);
    --color-logo-4: hsl(240, 7%, 27%);
    --color-logo-5: hsl(213, 16%, 39%);
    --color-text: hsl(0, 0%, 100%);
  }
  
  // Reset from https://courses.joshwcomeau.com/css-for-js/treasure-trove/010-global-styles
  /*
  1. Use a more-intuitive box-sizing model.
  */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /*
    2. Remove default margin
  */
  * {
    margin: 0;
  }

  /*
    3. Allow percentage-based heights in the application
  */
  html, body {
    height: 100%;
  }

  /*
    Typographic tweaks!
    4. Add accessible line-height
    5. Improve text rendering
  */
  body {
    background: var(--color-background);
    color: var(--color-text);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /*
    6. Improve media defaults
  */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  /*
    7. Remove built-in form typography styles
  */
  input, button, textarea, select {
    font: inherit;
  }

  /*
    8. Avoid text overflows
  */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  /*
    9. Create a root stacking context
  */
  #root, #__next {
    height: 100%;
    isolation: isolate;
  }
`;

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{ intlMessages: Record<string, string> }>) => {
  const { locale = "en" } = useRouter();

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={"en"}
      messages={pageProps.intlMessages}
      onError={(err) => {
        if (locale === "default") {
          // Ignore missing translation error for default locale
        } else {
          console.error(err);
        }
      }}
    >
      <ThemeProvider>
        <GlobalStyle />
        <MDXProvider components={mdxComponents}>
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default MyApp;
