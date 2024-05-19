import { Locale } from "@/app/i18n-config";
import { Layout } from "@/components/layout";
import { LifeCalendar } from "@/components/life-calendar/life-calendar";
// import { styled } from "@pigment-css/react";

type Props = {
  params: { lang: Locale };
};

// const StyledLifeCalendar = styled(LifeCalendar)`
//   padding-top: 16px;
//   padding-bottom: 16px;
// `;

const Home = ({ params: { lang } }: Props) => {
  return (
    <Layout lang={lang}>
      <LifeCalendar />
    </Layout>
  );
};

export default Home;
