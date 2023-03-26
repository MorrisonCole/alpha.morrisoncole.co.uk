import React from "react";
import styled from "styled-components";
import { addYears, eachWeekOfInterval, isWithinInterval } from "date-fns";
import { LifeCalendarWeek } from "./life-calendar-week";

const YearsInLife = Math.ceil(76.3);
const WeeksInYear = 52;
const TotalWeeks = YearsInLife * WeeksInYear;
const BirthDate = new Date(1992, 2, 15);
const KidInterval = {
  start: BirthDate,
  end: new Date(1996, 8, 1),
};
const PreWellsInterval = {
  start: new Date(1996, 8, 1),
  end: new Date(2006, 0, 1),
};
const WellsCathedralSchoolInterval = {
  start: new Date(2006, 0, 1),
  end: new Date(2010, 0, 1),
};
const UCLInterval = {
  start: new Date(2010, 0, 1),
  end: new Date(2014, 0, 1),
};

interface WeekGridProps {
  rows: number;
}

const WeekGrid = styled.span<WeekGridProps>`
  display: grid;
  grid-template-columns: repeat(${WeeksInYear / 4}, 1fr);
  grid-template-rows: repeat(${(p) => p.rows * 4}, 1fr);
  @media (min-width: 600px) {
    grid-template-columns: repeat(${WeeksInYear / 2}, 1fr);
    grid-template-rows: repeat(${(p) => p.rows * 2}, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(${WeeksInYear}, 1fr);
    grid-template-rows: repeat(${(p) => p.rows}, 1fr);
  }
  justify-content: center;
`;

interface LifeCalendarProps {
  className?: string;
}

export function LifeCalendar({ className }: LifeCalendarProps) {
  const weeksInLife = eachWeekOfInterval({
    start: BirthDate,
    end: addYears(BirthDate, YearsInLife),
  });

  const weeksLivedInterval = { start: BirthDate, end: new Date() };
  const weeksLived = eachWeekOfInterval(weeksLivedInterval);

  const items = [];
  for (const week of weeksInLife) {
    if (isWithinInterval(week, KidInterval)) {
      items.push(<LifeCalendarWeek>👶</LifeCalendarWeek>);
    } else if (isWithinInterval(week, PreWellsInterval)) {
      items.push(<LifeCalendarWeek>🚸</LifeCalendarWeek>);
    } else if (isWithinInterval(week, WellsCathedralSchoolInterval)) {
      items.push(<LifeCalendarWeek>🏰</LifeCalendarWeek>);
    } else if (isWithinInterval(week, UCLInterval)) {
      items.push(<LifeCalendarWeek>🎓</LifeCalendarWeek>);
    } else if (isWithinInterval(week, weeksLivedInterval)) {
      items.push(<LifeCalendarWeek>🧑‍💻</LifeCalendarWeek>);
    } else {
      items.push(<LifeCalendarWeek>❔</LifeCalendarWeek>);
    }
  }

  return (
    <WeekGrid className={className} rows={Math.ceil(YearsInLife)}>
      {items}
    </WeekGrid>
  );
}
