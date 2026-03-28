import type { Meta, StoryObj } from "@storybook/react-vite";

import { Header } from "./header";

const meta: Meta<typeof Header> = {
  component: Header,
};

type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export default meta;
