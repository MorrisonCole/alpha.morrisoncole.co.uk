# alpha.morrisoncole.co.uk [![Open in Visual Studio Code](https://img.shields.io/badge/open%20in-vscode.dev-blue)](https://open.vscode.dev/MorrisonCole/alpha.morrisoncole.co.uk)

My personal website.

Alpha [alpha.morrisoncole.co.uk](https://alpha.morrisoncole.co.uk). Production
[morrisoncole.co.uk](https://morrisoncole.co.uk) is from
https://github.com/MorrisonCole/morrisoncole.co.uk.

## Overview

A React 19 single-page application built with Vite and TypeScript.

## Development

### Requirements

Node (version specified in `.nvmrc`). Using [nvm](https://github.com/nvm-sh/nvm)
is recommended.

```sh
nvm install
npm install
```

### Scripts

| Command                   | Description                       |
| ------------------------- | --------------------------------- |
| `npm run dev`             | Start Vite dev server             |
| `npm run build`           | Production build                  |
| `npm run preview`         | Preview production build locally  |
| `npm run lint`            | ESLint                            |
| `npm run storybook`       | Storybook dev server on port 6006 |
| `npm run storybook:build` | Build static Storybook            |

[Husky](https://typicode.github.io/husky/) runs ESLint and
[Prettier](https://prettier.io/) on staged files via
[lint-staged](https://github.com/lint-staged/lint-staged) before each commit.

## Testing

### Storybook + Vitest

Component tests use [Vitest](https://vitest.dev/) in browser mode (Playwright /
Chromium) via
[@storybook/addon-vitest](https://storybook.js.org/addons/@storybook/addon-vitest).
Stories live alongside components (e.g. `button.stories.tsx`).

### Lighthouse CI

[lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci) runs on every
push and on a daily schedule. CI requires the `LHCI_GITHUB_APP_TOKEN` secret.

To run locally:

```sh
npm run build && npm run test:lighthouse
```

## CI/CD

GitHub Actions workflows in `.github/workflows/`:

| Workflow              | Trigger                     | Description                                                          |
| --------------------- | --------------------------- | -------------------------------------------------------------------- |
| `build.yml`           | Every push + daily schedule | Lighthouse CI performance regression testing                         |
| `deploy.yml`          | Push to `main`              | Lint, build, deploy to S3, invalidate CloudFront                     |
| `preview.yml`         | PR opened / updated         | Deploy PR preview to `pr-<number>.previews.alpha.morrisoncole.co.uk` |
| `preview-cleanup.yml` | PR closed                   | Delete PR preview from S3 and deactivate deployment                  |

[Renovate](https://docs.renovatebot.com/) is configured for automated dependency
updates.

## Infrastructure

AWS infrastructure is managed with [Terraform](https://www.terraform.io/) in
`terraform/`.

Terraform state is stored in S3 (`alpha-morrisoncole-terraform-state`). The
`terraform/bootstrap/` directory contains the config that creates the state
bucket itself.
