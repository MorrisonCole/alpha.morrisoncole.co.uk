import type { Meta, StoryObj } from "@storybook/react-vite";

import { LifeCalendar } from "./life-calendar";

const meta: Meta<typeof LifeCalendar> = {
  component: LifeCalendar,
};

type Story = StoryObj<typeof LifeCalendar>;

export const Default: Story = {};

export default meta;
