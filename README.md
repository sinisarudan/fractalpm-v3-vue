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
    "cmstead.js-codeformer"
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
- contine with [Run](#run)

## Run

- `pnpm dev`

## Model

- for models we use VOs (Value Objects) we don't use **Classes**, with methods to operate with them. Instead, we rely on `interface`-s stored in `VO_NAME-vos.ts` files and accompanied with `VO_NAME-operators.ts` that operate with it, to handle it.
  - this is for the reason of marshalling interfaces between frontend and backend; plain data without any behavioral logic; while keeping strong typing through interfaces instead of serialized classes
  - Another, a bit more demanding approach, would be to use classes for all frontend work but accompanied by VO's interface and `serialize` method that serializes class into that interface (e.g. for sending to server)
  - this approach can be discussed and adjusted

## Testing

### Unit Testing

We use [Vitest](https://vitest.dev/) (Jest Compatible) testing framework, because of convenience and speed due to being a *Vite*-native testing framework.

- `pnpm test:unit`
- `pnpm test:coverage`

### E2E Testing

We use [Playwright](https://playwright.dev/) due to its enabling Multi-agent testing in comparison to *Cypress*, etc

- start tests: `pnpm test:e2e` (=> `npx playwright test`)
- `npx playwright show-report`
- tests are in `./e2e` folder

## Building

- `pnpm build`
- builds in `dist` folder

### Checking built app

- go to `dist` folder`
- run `serve`
- if not installed:
  - `yarn global add serve`

## Advanced Dev Guide & Policies

### Advanced DevOps

[DevOps](./DevOps.md)

### UX/UI

#### Vuetify

##### Icons

- <https://vuetifyjs.com/en/features/icon-fonts/>
- TBD: after stabilizing the project, performance optimization and customization should be done following the above-link instructions