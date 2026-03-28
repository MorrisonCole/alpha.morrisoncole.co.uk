import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { GitHubIcon } from "./github-icon";
import { LinkedInIcon } from "./linkedin-icon";
import { ThreadsIcon } from "./threads-icon";
import { StackOverflowIcon } from "./stackoverflow-icon";

const AllIcons: React.FC = () => (
  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
    <GitHubIcon />
    <LinkedInIcon />
    <ThreadsIcon />
    <StackOverflowIcon />
  </div>
);

const meta: Meta<typeof AllIcons> = {
  component: AllIcons,
  title: "Social Icons",
};

type Story = StoryObj<typeof AllIcons>;

export const Default: Story = {};

export default meta;
