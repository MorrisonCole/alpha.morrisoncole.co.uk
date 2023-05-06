import { Layout } from "../components/layout";
import React from "react";
import styled from "styled-components";
import { LifeCalendar } from "../components/life-calendar/life-calendar";

const StyledLifeCalendar = styled(LifeCalendar)`
  padding-top: 16px;
  padding-bottom: 16px;
`;

const Home = () => {
  return (
    <Layout>
      <StyledLifeCalendar />
    </Layout>
  );
};

export default Home;
