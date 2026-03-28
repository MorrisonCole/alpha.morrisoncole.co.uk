import React, { useEffect } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LocaleProvider } from "../LocaleContext";
import { isValidLocale, i18n } from "../i18n-config";

export const LocaleLayout: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const locale = lang && isValidLocale(lang) ? lang : i18n.defaultLocale;
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
      </Helmet>
      <Outlet />
    </LocaleProvider>
  );
};
