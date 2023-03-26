import styled from "styled-components";
import React from "react";

const Entry = styled.p`
  text-align: center;
`;

interface LifeCalendarWeekProps {
  children: string;
  week: Date;
}

export function LifeCalendarWeek({ children, week }: LifeCalendarWeekProps) {
  return <Entry title={week.toDateString()}>{children}</Entry>;
}
