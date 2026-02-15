import { Locale } from "@/app/i18n-config";
import { Layout } from "@/components/layout";
import { LifeCalendar } from "@/components/life-calendar/life-calendar";
// import { styled } from "@pigment-css/react";

// const StyledLifeCalendar = styled(LifeCalendar)`
//   padding-top: 16px;
//   padding-bottom: 16px;
// `;

const Home = async ({ params }: PageProps<"/[lang]/life">) => {
  const { lang } = await params;
  const locale = lang as Locale;

  return (
    <Layout lang={locale}>
      <LifeCalendar />
    </Layout>
  );
};

export default Home;
