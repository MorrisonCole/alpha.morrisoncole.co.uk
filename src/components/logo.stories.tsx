import type { Meta, StoryObj } from "@storybook/react-vite";

import Logo from "./logo";

const meta: Meta<typeof Logo> = {
  component: Logo,
};

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};

export const WithClassName: Story = {
  args: {
    className: "custom-class",
  },
};

export default meta;
