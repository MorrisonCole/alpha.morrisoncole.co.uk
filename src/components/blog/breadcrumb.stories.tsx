import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb } from "./breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  component: Breadcrumb,
};

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    postTitle: "One Year in Japan",
  },
};

export default meta;
