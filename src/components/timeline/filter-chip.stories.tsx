import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterChip } from "./filter-chip";

const meta: Meta<typeof FilterChip> = {
  component: FilterChip,
};

type Story = StoryObj<typeof FilterChip>;

export const Active: Story = {
  args: {
    label: "Everything",
    active: true,
    onClick: () => {},
  },
};

export const Inactive: Story = {
  args: {
    label: "Software",
    active: false,
    onClick: () => {},
  },
};

const AllChips: React.FC = () => (
  <div style={{ display: "flex", gap: "0.5rem" }}>
    <FilterChip label="Everything" active={true} onClick={() => {}} />
    <FilterChip label="Life" active={false} onClick={() => {}} />
    <FilterChip label="Music" active={false} onClick={() => {}} />
    <FilterChip label="Software" active={false} onClick={() => {}} />
  </div>
);

export const AllCategories: StoryObj<typeof AllChips> = {
  render: () => <AllChips />,
};

export default meta;
