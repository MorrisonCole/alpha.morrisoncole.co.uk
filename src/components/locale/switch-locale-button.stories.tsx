import type { Meta, StoryObj } from "@storybook/react-vite";

import { SwitchLocaleButton } from "./switch-locale-button";

const meta: Meta<typeof SwitchLocaleButton> = {
  component: SwitchLocaleButton,
};

type Story = StoryObj<typeof SwitchLocaleButton>;

export const Default: Story = {
  args: {
    label: "日本語に切り替え",
  },
};

export default meta;
