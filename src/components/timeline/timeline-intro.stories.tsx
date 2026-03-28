import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimelineIntro } from "./timeline-intro";

const meta: Meta<typeof TimelineIntro> = {
  component: TimelineIntro,
};

type Story = StoryObj<typeof TimelineIntro>;

export const Default: Story = {};

export default meta;
