import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { ThemeToggle } from "./theme-toggle";

const meta: Meta<typeof ThemeToggle> = {
  component: ThemeToggle,
};

type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};

export const ToggleToDark: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /change to/i });
    await userEvent.click(button);
    await expect(button).toHaveAccessibleName(/change to light mode/i);
  },
};

export default meta;
