import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Layout } from "../components/layout";
import { useLocale } from "../LocaleContext";
import styles from "./HomePage.module.css";

export const HomePage: React.FC = () => {
  const { locale, dictionary } = useLocale();

  return (
    <Layout>
      <Helmet>
        <title>{dictionary.home.title}</title>
        <meta name="description" content={dictionary.home.description} />
      </Helmet>
      <h1 className={styles.title}>{dictionary.home.header}</h1>
      <p>
        I&apos;m <span className={styles.bold}>bold.</span>
      </p>
      <p>
        I&apos;m <span className={styles.italic}>italic.</span>
      </p>
      <p>
        I&apos;m <span className={styles.boldItalic}>both!</span>
      </p>

      <p className={styles.japanese}>日本語で書いてます。</p>

      <Link
        to={`/${locale}/blog`}
        style={{ display: "block", margin: "0.5rem 0" }}
      >
        Blog
      </Link>
      <Link
        to={`/${locale}/life`}
        style={{ display: "block", margin: "0.5rem 0" }}
      >
        Life
      </Link>
    </Layout>
  );
};
