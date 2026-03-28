import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import { LocaleButton } from "./locale-button";

const meta: Meta<typeof LocaleButton> = {
  component: LocaleButton,
  args: {
    onClick: fn(),
  },
};

type Story = StoryObj<typeof LocaleButton>;

export const Default: Story = {
  args: {
    disabled: false,
    children: "日本語",
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole("button", { name: "日本語" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "English",
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole("button", { name: "English" });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export default meta;
