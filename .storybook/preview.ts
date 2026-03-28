import React from "react";
import type { Preview } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { LocaleProvider } from "../src/LocaleContext";
import "../src/index.css";

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    (Story) =>
      React.createElement(
        MemoryRouter,
        { initialEntries: ["/en"] },
        React.createElement(LocaleProvider, {
          locale: "en",
          children: React.createElement(Story),
        }),
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
    },
  },
};

export default preview;
