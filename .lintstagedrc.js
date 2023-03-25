const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "**/*.{tsx, ts, js}": [buildEslintCommand, "prettier --write"],
  "**/*.{md,mdx,json,yml,html,css}": ["prettier --write"],
};
