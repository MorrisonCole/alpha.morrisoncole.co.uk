import type { Meta, StoryObj } from "@storybook/react-vite";
import { Timeline } from "./timeline";
import { timelineEntries, Category } from "./timeline-data";

const meta: Meta<typeof Timeline> = {
  component: Timeline,
};

type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  args: {
    entries: timelineEntries,
  },
};

export const FilteredSoftware: Story = {
  args: {
    entries: timelineEntries.filter((e) => e.category === Category.Software),
  },
};

export const FilteredLife: Story = {
  args: {
    entries: timelineEntries.filter((e) => e.category === Category.Life),
  },
};

export const FilteredMusic: Story = {
  args: {
    entries: timelineEntries.filter((e) => e.category === Category.Music),
  },
};

export default meta;
