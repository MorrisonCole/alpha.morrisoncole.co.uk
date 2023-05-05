module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
  ],
  parserOptions: {
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "formatjs"],
  rules: {
    "react/react-in-jsx-scope": "error",
    "formatjs/enforce-default-message": ["error", "literal"],
    "formatjs/enforce-id": [
      "error",
      {
        idInterpolationPattern: "[sha512:contenthash:base64:6]",
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
  },
};
