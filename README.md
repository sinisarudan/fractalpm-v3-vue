# fractalpm-v3-vue

The Vue3 web application for FractalPM

## Dev Stack

- **JavaScript**
- Vue 3
- Vuetify
- Vite
- Pinia
- Vitest
- Playwright

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable *Vetur*) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
- the project is accompanied by the `vscode` extensions recommendations in `.vscode/extensions.json`. Current recommendations:

```json
{
  "recommendations": [
    "vue.vscode-typescript-vue-plugin",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "xabikos.javascriptsnippets",
    "aaron-bond.better-comments",
    "ms-playwright.playwright",
    "standard.vscode-standard",
    "zixuanchen.vitest-explorer",
    "hollowtree.vue-snippets",
    "cmstead.js-codeformer",
    "oouo-diogo-perdigao.docthis"
  ]
}
```

## Init

- `npm install -g pnpm`
  - We are using [**PNPM**](https://pnpm.io/) for the reasons of speed, storage saving, etc, more at:
    - <https://medium.com/@buffet_time/why-you-should-move-to-pnpm-82962f332418>
    - <https://www.youtube.com/watch?v=ZIKDJBrk56k&t=7s&ab_channel=Theo-t3%E2%80%A4gg>
- This step is  **NOT NEEDED** when initializing the existing project (here only for history reasons):
  - `pnpm create vite@latest`
    - `✔ Project name: … fractalpm-v3-vue-js`
    - `✔ Select a framework: › Vue`
    - `✔ Select a variant: › JavaScript`
- `cd fractalpm-v3-vue-js`
- `pnpm install`
- continue with [Run](#run)

## Run

- `pnpm dev`

## System Design

in [DevOps](./DevOps/DevOps.md)

## Testing

### Unit Testing

We use [Vitest](https://vitest.dev/) (Jest Compatible) testing framework, because of convenience and speed due to being a *Vite*-native testing framework.

- `pnpm test:unit`
- `pnpm test:coverage`

### E2E Testing

We use [Playwright](https://playwright.dev/) due to its enabling Multi-agent testing in comparison to *Cypress*, etc

- start tests: `pnpm test:e2e` (=> `pnpm playwright test`)
- `pnpm playwright show-report`
- tests are in `./e2e` folder

### advanced

- to avoid errors on tests that include `await page.goto('/');`, check `baseURL` setting in `playwright.config.cjs`

```js
use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5173',
    // baseURL: 'http://127.0.0.1:3000',
  },
```

## Building

- `pnpm build`
- builds in the `dist` folder

### Checking built app

- go to `dist` folder`
- run `serve`
- if not installed:
  - `yarn global add serve`

## Deployment

- **IMPORTANT**:
  - to enforce code code styling, check for ESLint errors and correct them
  - **before committing the code**, run `npx eslint src`
    - if there are too many errors, most of them can be fixed automatically by running `npx eslint --fix src`

## Advanced Dev Guide & Policies

### Advanced DevOps

[DevOps](./DevOps/DevOps.md)

### UX/UI

#### Vuetify

##### Icons

- <https://vuetifyjs.com/en/features/icon-fonts/>
- TBD: after stabilizing the project, performance optimization and customization should be done following the above-link instructions