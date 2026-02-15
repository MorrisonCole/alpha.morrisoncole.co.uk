import nextConfig from "eslint-config-next";
import storybookPlugin from "eslint-plugin-storybook";

const eslintConfig = [
  ...nextConfig,
  ...storybookPlugin.configs["flat/recommended"],
];

export default eslintConfig;
