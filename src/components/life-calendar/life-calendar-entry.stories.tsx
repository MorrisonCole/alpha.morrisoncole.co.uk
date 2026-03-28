import type { Meta, StoryObj } from "@storybook/react-vite";

import { LifeCalendarEntry } from "./life-calendar-entry";

const meta: Meta<typeof LifeCalendarEntry> = {
  component: LifeCalendarEntry,
};

type Story = StoryObj<typeof LifeCalendarEntry>;

export const Kid: Story = {
  args: {
    children: "👶",
    week: new Date(1993, 0, 1),
  },
};

export const Work: Story = {
  args: {
    children: "🧑‍💻",
    week: new Date(2020, 5, 15),
  },
};

export const Unlived: Story = {
  args: {
    children: "❔",
    week: new Date(2050, 0, 1),
  },
};

export default meta;
