import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Layout } from "./layout";

const meta: Meta<typeof Layout> = {
  component: Layout,
};

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    children: React.createElement("p", null, "Page content goes here"),
  },
};

export const WithRichContent: Story = {
  args: {
    children: React.createElement(
      "div",
      null,
      React.createElement("h1", null, "Hello World"),
      React.createElement(
        "p",
        null,
        "This is a sample page rendered inside the Layout component.",
      ),
    ),
  },
};

export default meta;
