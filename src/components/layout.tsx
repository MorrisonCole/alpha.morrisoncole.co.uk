import "@pigment-css/react/styles.css";
import React from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { styled } from "@pigment-css/react";
import { Locale } from "@/app/i18n-config";

const Grid = styled.span`
  min-height: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr min(85ch, 100%) 1fr 3fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    ". header header header ."
    ". content content content ."
    "footer footer footer footer footer";
`;

const Content = styled.main`
  grid-area: content;
`;

export const Layout = ({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) => (
  <Grid>
    <Header lang={lang} />
    <Content role="main">{children}</Content>
    <Footer />
  </Grid>
);
