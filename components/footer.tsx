import styled from "styled-components";
import React from "react";
import { getYear } from "date-fns";

const FooterContainer = styled.footer`
  grid-area: footer;
  background-color: hsl(0, 0%, 26%);
  padding: ${(props) => props.theme.spacing[6]};
`;

export const Footer = () => {
  const currentYear = getYear(new Date());

  return (
    <FooterContainer>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>{"Handcrafted with TypeScript, React, and Next.js"}</p>
        <p>{`\u{00A9} Morrison Cole ${currentYear}`}</p>
      </div>
    </FooterContainer>
  );
};
