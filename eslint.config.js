import globals from "globals";
import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import packageJson from "eslint-plugin-package-json";

export default defineConfig(
  [globalIgnores(["dist", "storybook-static", "e2e"])],
  {
    files: ["**/*.ts", "**/*.tsx"],

    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
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
