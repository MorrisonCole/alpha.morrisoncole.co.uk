import globals from "globals";
import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import packageJson from "eslint-plugin-package-json";
import { reactRefresh } from "eslint-plugin-react-refresh";

export default defineConfig(
  [globalIgnores(["dist", "**/dist-types", "storybook-static", "e2e"])],
  {
    files: ["**/*.ts", "**/*.tsx"],

    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite(),
    ],

    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ["**/package.json"],

    extends: [packageJson.configs.recommended],

    settings: {
      packageJson: {
        enforceForPrivate: false,
      },
    },

    rules: {
      "package-json/restrict-dependency-ranges": [
        "error",
        {
          rangeType: "pin",
        },
      ],
    },
  },
  {
    files: ["**/*.cjs"],

    languageOptions: {
      globals: globals.node,
    },
  },
);
