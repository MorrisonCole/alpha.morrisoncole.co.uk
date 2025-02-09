import { relative } from "path";
import { type Configuration } from "lint-staged";

const buildEslintCommand = (filenames: string[]) =>
  `next lint --fix --file ${filenames
    .map((f: string) => relative(process.cwd(), f))
    .join(" --file ")}`;

const prettierCommand = "prettier --ignore-unknown --write";

const configuration: Configuration = {
  "*.{tsx, ts, js}": [buildEslintCommand, prettierCommand],
  "!(*.{tsx, ts, js})": prettierCommand,
};

export default configuration;
