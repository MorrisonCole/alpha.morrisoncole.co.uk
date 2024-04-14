import React from "react";
import styled from "styled-components";
import { Footer } from "./footer";
import { Header } from "./header";

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

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <Grid>
    <Header />
    <Content role="main">{children}</Content>
    <Footer />
  </Grid>
);
