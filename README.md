# fractalpm-v3-vue

The Vue3 web application for FractalPM

## Model

- for models we use VOs (Value Objects) we don't use **Classes**, with methods to operate with them. Instead, we rely on `interface`-s stored in `VO_NAME-vos.ts` files and accompanied with `VO_NAME-operators.ts` that operate with it, to handle it.
  - this is for the reason of marshalling interfaces between frontend and backend; plain data without any behavioral logic; while keeping strong typing through interfaces instead of serialized classes
  - Another, a bit more demanding approach, would be to use classes for all frontend work but accompanied by VO's interface and `serialize` method that serializes class into that interface (e.g. for sending to server)
  - this approach can be discussed and adjusted

## Testing

### Unit Testing

We use [Vitest](https://vitest.dev/) (Jest Compatible) testing framework, because of convenience and speed due to being a *Vite*-native testing framework.

- `npm run test:unit`
- `npm run test:coverage`

### E2E Testing

We use [Playwright](https://playwright.dev/) due to its enabling Multi-agent testing in comparison to *Cypress*, etc

- start tests: `npm run test:e2e` (=> `npx playwright test`)
- `npx playwright show-report`
- tests are in `./e2e` folder

## Building
- `npm run build`
- builds in `dist` folder

### Checking built app
- go to `dist` folder`
- run `serve`
- if not installed:
  - `yarn global add serve`

### Advanced DevOps

[DevOps](./DevOps.md)
