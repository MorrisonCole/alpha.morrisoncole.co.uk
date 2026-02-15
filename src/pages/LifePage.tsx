import React from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "../components/layout";
import { LifeCalendar } from "../components/life-calendar/life-calendar";

export const LifePage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Life Calendar | Morrison Cole</title>
        <meta
          name="description"
          content="A visual representation of my life in weeks"
        />
      </Helmet>
      <LifeCalendar />
    </Layout>
  );
};
