import { Layout } from "../components/layout";
import React from "react";
import styled from "styled-components";
import { LifeCalendar } from "../components/life-calendar/life-calendar";
import { GetStaticPropsContext } from "next";
import { loadIntlMessages } from "@/utils/load-intl-messages";

const StyledLifeCalendar = styled(LifeCalendar)`
  padding-top: 16px;
  padding-bottom: 16px;
`;

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    intlMessages: await loadIntlMessages(locale),
  },
});

const Home = () => {
  return (
    <Layout>
      <StyledLifeCalendar />
    </Layout>
  );
};

export default Home;
