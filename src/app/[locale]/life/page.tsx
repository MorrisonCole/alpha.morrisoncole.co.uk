import { Layout } from "@/components/layout";
import { LifeCalendar } from "@/components/life-calendar/life-calendar";
import { styled } from "@pigment-css/react";
import { unstable_setRequestLocale } from "next-intl/server";

const StyledLifeCalendar = styled(LifeCalendar)`
  padding-top: 16px;
  padding-bottom: 16px;
`;

type Props = {
  params: { locale: string };
};

const Home = ({ params: { locale } }: Props) => {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <Layout>
      <StyledLifeCalendar />
    </Layout>
  );
};

export default Home;
