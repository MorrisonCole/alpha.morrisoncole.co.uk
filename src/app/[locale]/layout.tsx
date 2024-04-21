interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function Layout({ children, params: { locale } }: LayoutProps) {
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
    <html lang={locale}>
      <head>
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
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: setColorsByTheme }} />
        {children}
      </body>
    </html>
  );
}
