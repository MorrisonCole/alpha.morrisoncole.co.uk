import { styled } from "@pigment-css/react";
import React from "react";

const Entry = styled.p`
  text-align: center;
`;

interface LifeCalendarEntryProps {
  children: string;
  week: Date;
}

export const LifeCalendarEntry = ({
  children,
  week,
}: LifeCalendarEntryProps) => (
  <Entry title={week.toDateString()}>{children}</Entry>
);
