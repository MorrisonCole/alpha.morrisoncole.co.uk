import React, { useEffect } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LocaleProvider } from "../LocaleContext";
import { isValidLocale, i18n, type Locale } from "../i18n-config";

const setColorsByTheme = `
  (function() {
    function getUserPreference() {
      if (window.localStorage.getItem("theme")) {
        return window.localStorage.getItem("theme");
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.dataset.theme = getUserPreference();
  })();
`;

export const LocaleLayout: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const locale = (
    lang && isValidLocale(lang) ? lang : i18n.defaultLocale
  ) as Locale;
  const shouldRedirect = !lang || !isValidLocale(lang);

  // Set font class based on locale
  useEffect(() => {
    if (!shouldRedirect) {
      document.body.className = locale === "ja" ? "font-jp" : "font-latin";
    }
  }, [locale, shouldRedirect]);

  if (shouldRedirect) {
    return <Navigate to={`/${i18n.defaultLocale}`} replace />;
  }

  return (
    <LocaleProvider locale={locale}>
      <Helmet>
        <html lang={locale} />
        <script>{setColorsByTheme}</script>
      </Helmet>
      <Outlet />
    </LocaleProvider>
  );
};
