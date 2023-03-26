import styled from "styled-components";
import React from "react";

const Entry = styled.p`
  text-align: center;
`;

interface LifeCalendarEntryProps {
  children: string;
  week: Date;
}

export function LifeCalendarEntry({ children, week }: LifeCalendarEntryProps) {
  return <Entry title={week.toDateString()}>{children}</Entry>;
}
