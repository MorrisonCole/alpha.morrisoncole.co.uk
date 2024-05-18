import { Layout } from "@/components/layout";
import { LifeCalendar } from "@/components/life-calendar/life-calendar";
import { styled } from "@pigment-css/react";

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
