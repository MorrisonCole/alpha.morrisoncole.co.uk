import React from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { styled } from "@pigment-css/react";

const Grid = styled.span`
  min-height: 100%;
  display: grid;
  grid-template-columns: minmax(1rem, 3fr) minmax(auto, 60rem) minmax(1rem, 3fr);
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
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Grid>
    <Header />
    <Content role="main">{children}</Content>
    <Footer />
  </Grid>
);
