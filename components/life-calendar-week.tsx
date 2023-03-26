import styled from "styled-components";
import React from "react";

const Entry = styled.p`
  text-align: center;
`;

export function LifeCalendarWeek({ children }: { children: string }) {
  return <Entry>{children}</Entry>;
}
