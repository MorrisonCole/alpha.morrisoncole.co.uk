import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "../components/layout";
import { useLocale } from "../LocaleContext";

export const NotFoundPage: React.FC = () => {
  const { locale } = useLocale();

  return (
    <Layout>
      <Helmet>
        <title>404 - Page Not Found | Morrison Cole</title>
      </Helmet>
      <h1>404 - Page Not Found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to={`/${locale}`}>Go back home</Link>
    </Layout>
  );
};
