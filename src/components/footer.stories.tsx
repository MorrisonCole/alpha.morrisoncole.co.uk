import type { Meta, StoryObj } from "@storybook/react-vite";

import { Footer } from "./footer";

const meta: Meta<typeof Footer> = {
  component: Footer,
};

type Story = StoryObj<typeof Footer>;

export const Default: Story = {};

export default meta;
