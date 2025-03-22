import { styled } from "@pigment-css/react";
import React from "react";
import { getYear } from "date-fns";

const FooterContainer = styled.footer`
  grid-area: footer;
  background-color: hsl(0, 0%, 26%);
  padding: var(--spacing-6);
  display: grid;
  grid-template-columns: inherit;
`;

export const Footer = () => {
  const currentYear = getYear(new Date());

  return (
    <FooterContainer role="contentinfo">
      <div
        style={{ display: "flex", flexDirection: "column", gridColumn: "2" }}
      >
        <p>{"Handcrafted with TypeScript, React, and Next.js"}</p>
        <p>{`\u{00A9} Morrison Cole ${currentYear}`}</p>
      </div>
    </FooterContainer>
  );
};
