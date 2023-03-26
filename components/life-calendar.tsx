import React from "react";
import styled from "styled-components";
import {
  addYears,
  eachWeekOfInterval,
  getWeek,
  isSameYear,
  isWithinInterval,
} from "date-fns";
import { LifeCalendarWeek } from "./life-calendar-week";

const YearsInLife = Math.ceil(76.3);
const WeeksInYear = 52;
const TotalWeeks = YearsInLife * WeeksInYear;
const BirthDate = new Date(1992, 2, 15);

const Intervals = [
  {
    title: "Kid",
    text: "👶",
    interval: {
      start: BirthDate,
      end: new Date(1996, 8, 1),
    },
  },
  {
    title: "School",
    text: "🚸",
    interval: {
      start: new Date(1996, 8, 1),
      end: new Date(2006, 0, 1),
    },
  },
  {
    title: "Wells",
    text: "🏰",
    interval: {
      start: new Date(2006, 0, 1),
      end: new Date(2010, 0, 1),
    },
  },
  {
    title: "UCL",
    text: "🎓",
    interval: {
      start: new Date(2010, 0, 1),
      end: new Date(2015, 6, 14),
    },
  },
  {
    title: "Work",
    text: "🧑‍💻",
    interval: {
      start: new Date(2015, 6, 15),
      end: new Date(),
    },
  },
  {
    title: "Unlived",
    text: "❔",
    interval: {
      start: new Date(),
      end: addYears(BirthDate, YearsInLife),
    },
  },
];

const WeekGrid = styled.span`
  display: grid;
  grid-template-columns: repeat(${WeeksInYear / 4}, 1fr);
  @media (min-width: 600px) {
    grid-template-columns: repeat(${WeeksInYear / 2}, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(${WeeksInYear}, 1fr);
  }
  justify-content: center;
  *:first-child {
    grid-column-start: 12;
  }
`;

const YearDivider = styled.hr`
  grid-column: 1/-1;
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
  for (let i = 0; i < weeksInLife.length; i++) {
    const week = weeksInLife[i];

    for (const entry of Intervals) {
      if (isWithinInterval(week, entry.interval)) {
        items.push(
          <LifeCalendarWeek key={week.valueOf()} week={week}>
            {entry.text}
          </LifeCalendarWeek>
        );
        break;
      }
    }

    const nextWeek = weeksInLife[i + 1];
    if (!isSameYear(week, nextWeek)) {
      items.push(<YearDivider key={i} />);
    }
  }

  return <WeekGrid className={className}>{items}</WeekGrid>;
}
