import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navbar } from "./navbar";

const meta: Meta<typeof Navbar> = {
  component: Navbar,
};

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};

export default meta;
