# Copilot Coding Agent Instructions

Trust these instructions. Only search the codebase if the information here is incomplete or found to be in error.

## Repository Summary

Personal website for Morrison Cole — a React 19 SPA built with **Vite**, **TypeScript**, and **MDX** for blog content. Supports English (`en`) and Japanese (`ja`) locales. Deployed to AWS S3 + CloudFront. Small codebase (~50 source files).

## Tech Stack

- **Runtime:** Node.js 25.8.2 (pinned in `.nvmrc`)
- **Framework:** React 19, React Router DOM 7, react-helmet-async
- **Build:** Vite 8 (Rolldown) with `@vitejs/plugin-react` (Oxc) and `@mdx-js/rollup`
- **Language:** TypeScript 6 (strict mode, `noEmit`, `noUnusedLocals`, `noUnusedParameters`)
- **Styling:** CSS Modules (`*.module.css`) + CSS custom properties in `src/index.css`
- **Content:** MDX files with YAML frontmatter in `src/content/blog/`
- **Testing:** Vitest 4 + Storybook 10 (browser mode, Playwright/Chromium) — **currently broken**, see below
- **Linting:** ESLint 10 with `typescript-eslint` (type-checked) + `eslint-plugin-react-hooks`
- **Formatting:** Prettier (config: `proseWrap: "always"`)
- **Pre-commit:** Husky + lint-staged runs ESLint `--fix` and Prettier on staged files
- **Infrastructure:** Terraform (in `terraform/`)

## Build & Validation Commands

Always run `npm ci` before any other command. All commands run from the repo root.

| Step | Command | Notes |
|------|---------|-------|
| Install | `npm ci` | ~15s. Always use `npm ci`, not `npm install`. |
| Typecheck | `npm run typecheck` | Runs `tsc --build`. Must pass with zero errors. |
| Lint | `npm run lint` | Runs `eslint .`. Must pass with zero errors. |
| Build | `npm run build` | Runs `vite build`. Output in `dist/`. ~300ms. |
| Dev server | `npm run dev` | Vite dev server with HMR. |
| Preview | `npm run preview` | Preview production build on `localhost:4173`. |
| Lighthouse | `npm run build && npm run test:lighthouse` | Requires build first. Uses `lhci autorun`. |
| Storybook | `npm run storybook` | Dev server on port 6006. |
| Storybook build | `npm run storybook:build` | Static Storybook build. |

### Known Issues

- **Vitest is broken:** `npx vitest run` fails with `The 'test.workspace' option was removed in Vitest 4. Please, migrate to 'test.projects' instead.` in `vitest.config.ts`. Do not attempt to run Vitest tests. Do not modify the vitest config unless specifically asked.

### Validation Sequence for PRs

Always validate changes with this exact sequence:

```sh
npm run typecheck
npm run lint
npm run build
npm run test:storybook
```

This matches the CI pipeline. If all pass, the change is ready for a PR.

## CI/CD Pipelines (`.github/workflows/`)

| Workflow | Trigger | What it does |
|----------|---------|-------------|
| `deploy.yml` | Push to `main` | Lint → Build → Deploy to S3 → Invalidate CloudFront |
| `build.yml` | Every push + daily cron | `npm ci` → `npm run build` → `npm run test:lighthouse` |
| `preview.yml` | PR opened/updated | Build → Deploy preview to `pr-<N>.previews.alpha.morrisoncole.co.uk` |
| `preview-cleanup.yml` | PR closed | Clean up S3 preview + deactivate deployment |
| `terraform-plan.yml` | PR touching `terraform/**` | Terraform fmt check + validate + plan |
| `terraform-apply.yml` | Push to `main` touching `terraform/**` | Terraform apply |

CI uses Node.js 25.8.2, `npm ci`, and runs on `ubuntu-latest`.

## Project Layout

```
├── src/
│   ├── main.tsx                  # App entry point (React root, BrowserRouter, HelmetProvider)
│   ├── App.tsx                   # Routes via useRoutes()
│   ├── routes.tsx                # All route definitions (/:lang/* pattern)
│   ├── i18n-config.ts            # Locale config: "en" (default), "ja"
│   ├── LocaleContext.tsx          # React context providing locale + dictionary
│   ├── index.css                 # Global CSS (custom properties, theme, fonts)
│   ├── mdx-components.tsx         # Custom MDX component overrides
│   ├── components/               # Shared UI components
│   │   ├── layout.tsx            # Page shell: Header + main + Footer
│   │   ├── header.tsx            # Logo + locale switch + theme toggle
│   │   ├── footer.tsx
│   │   ├── logo.tsx
│   │   ├── button/               # Button component + Storybook story
│   │   ├── life-calendar/        # Life calendar widget
│   │   ├── locale/               # Locale switching buttons
│   │   └── theme/                # Dark/light theme toggle + types
│   ├── content/blog/             # MDX blog posts (fonts.mdx, lighthouse.mdx, one-year-in-japan.mdx)
│   ├── dictionaries/             # i18n JSON files (en.json, ja.json)
│   ├── layouts/LocaleLayout.tsx  # Wraps routes with LocaleProvider, validates locale param
│   └── pages/                    # Page components (HomePage, BlogIndexPage, BlogPostPage, LifePage, NotFoundPage)
├── public/                       # Static assets (images, robots.txt)
├── types/                        # Global type declarations (intl.d.ts, mdx.d.ts)
├── terraform/                    # AWS infrastructure (S3, CloudFront)
├── .github/
│   ├── workflows/                # CI/CD (see table above)
│   ├── scripts/                  # Deployment helper scripts (separate package.json + tsconfig)
│   └── renovate.json             # Dependency update config
├── .storybook/                   # Storybook config (main.ts, preview.ts)
├── .husky/pre-commit             # Runs `npx lint-staged`
├── index.html                    # Vite HTML entry point
├── vite.config.ts                # Vite config (React Oxc + MDX plugins)
├── vitest.config.ts              # Vitest config (currently broken, see Known Issues)
├── eslint.config.js              # ESLint flat config (recommended + type-checked + react-hooks)
├── tsconfig.json                 # Root coordinator — references tsconfig.src.json + tsconfig.test.json
├── tsconfig.base.json            # Shared compiler options (strict, composite, bundler resolution)
├── tsconfig.src.json             # TypeScript config for app source (src/, types/, config files)
├── tsconfig.test.json            # TypeScript config for tests (vitest, .storybook/)
├── .prettierrc                   # Prettier config (proseWrap: "always")
├── .lintstagedrc.ts              # lint-staged config (ESLint --fix + Prettier)
├── .nvmrc                        # Node version: 25.8.2
└── lighthouserc.cjs              # Lighthouse CI config (tests http://localhost:4173/en)
```

## Key Conventions

- **CSS Modules:** Every component uses `*.module.css` co-located with its `.tsx` file. Global styles are only in `src/index.css`.
- **i18n:** All user-facing strings go in `src/dictionaries/en.json` and `src/dictionaries/ja.json`. Access via `useLocale()` hook which returns `{ locale, dictionary }`.
- **Routing:** All routes are locale-prefixed (`/:lang/...`). The root `/` redirects to `/en`.
- **Blog posts:** MDX files in `src/content/blog/`. Each requires YAML frontmatter with: `title`, `date`, `description`, `category`, `image`, `imageAlt`, `linkText`, `draft`, `slug`. New posts must also be registered in `src/pages/BlogPostPage.tsx` (lazy import + frontmatter import + both maps).
- **Storybook stories:** Co-located with components (e.g., `button.stories.tsx` next to `button.tsx`).
- **TypeScript:** Uses composite projects (`tsc --build`). `tsconfig.json` is the root coordinator referencing `tsconfig.src.json` (app source) and `tsconfig.test.json` (vitest/storybook). Strict mode with `noUnusedLocals` and `noUnusedParameters` — unused variables/imports cause build errors.
- **`.github/scripts/`** has its own `package.json` and composite tsconfig (`tsconfig.src.json`) — separate from the main project. CI runs `npm ci --prefix .github/scripts` for it.
- **Terraform** files are in `terraform/` and have their own CI workflows.

### UI Components

When working on UI components, always use the `storybook` MCP tools to access Storybook's component and documentation knowledge before answering or taking any action.

- **CRITICAL: Never hallucinate component properties!** Before using ANY property on a component from a design system (including common-sounding ones like `shadow`, etc.), you MUST use the MCP tools to check if the property is actually documented for that component.
- Query `list-all-documentation` to get a list of all components
- Query `get-documentation` for that component to see all available properties and examples
- Only use properties that are explicitly documented or shown in example stories
- If a property isn't documented, do not assume properties based on naming conventions or common patterns from other libraries. Check back with the user in these cases.
- Use the `get-storybook-story-instructions` tool to fetch the latest instructions for creating or updating stories. This will ensure you follow current conventions and recommendations.
- Check your work by running `run-story-tests`.

Remember: A story name might not reflect the property name correctly, so always verify properties through documentation or example stories before using them.
