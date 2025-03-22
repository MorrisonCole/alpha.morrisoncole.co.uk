import "@pigment-css/react/styles.css";
import React from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { styled } from "@pigment-css/react";
import { Locale } from "@/app/i18n-config";

const Grid = styled.span`
  min-height: 100%;
  display: grid;
  grid-template-columns: 3fr minmax(auto, 60rem) 3fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    ". header ."
    ". content ."
    "footer footer footer";
`;

const Content = styled.main`
  grid-area: content;
`;

interface LayoutProps {
  lang: Locale;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ lang, children }) => (
  <Grid>
    <Header lang={lang} />
    <Content role="main">{children}</Content>
    <Footer />
  </Grid>
);
