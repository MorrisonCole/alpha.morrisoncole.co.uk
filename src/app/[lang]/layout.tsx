import { Locale, i18n } from "../i18n-config";
import { Noto_Sans, Noto_Sans_JP } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"] });
const notoSansJp = Noto_Sans_JP({ preload: false });

export const generateStaticParams = () => {
  return i18n.locales.map((locale) => ({ lang: locale }));
};

interface LayoutProps {
  children: React.ReactNode;
  params: { lang: Locale };
}

export default function Layout({ children, params: { lang } }: LayoutProps) {
  const defaultTheme = "light";

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
    <html lang={lang} data-theme={defaultTheme}>
      <body
        className={`${lang === "en" ? notoSans.className : notoSansJp.className}`}
      >
        <script dangerouslySetInnerHTML={{ __html: setColorsByTheme }} />
        {children}
      </body>
    </html>
  );
}
