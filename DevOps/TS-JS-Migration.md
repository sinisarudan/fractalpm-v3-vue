# TS -> JS Migration

## The things we lose by using JS instead of TS

### Auto-importing

- when using something (a class, ...) defined in other file
- there should be some workaround

### Classes

- **Access** Modifiers:
  - TypeScript allows you to use access modifiers (`public`, `private`, and `protected`) to control the visibility of properties and methods

## Approach with differential migration

### Instructions

1. making a snapshot of TS structure:  `tree --gitignore > DevOps/project_tree-TS.txt`
2. renaming all `*.ts` files to `*.js`:
   1. `find . -type f -name "*.ts" -exec bash -c 'mv "$0" "${0%.ts}.js"' {} \;`
3. making a snapshot of JS structure after renaming: `tree --gitignore > DevOps/project_tree-JS.txt`
4. renaming all `tsconfig(.*).json` files
   1. execute `tsconfig-jsconfig.sh`
   2. JS don't have **REFERENCES**: `https://www.typescriptlang.org/docs/handbook/project-references.html`
5. Update Vue Configuration (if needed):
   1. In `vite.config.js` or `vue.config.js` or `vitest.config.js`
   2. check for TypeScript-related configurations and remove them.
6. **TBD**
7. ...

**Remove TypeScript-Specific Code**:
- Remove type annotations from your JavaScript files.
- Remove TypeScript-specific configurations from Vue components, such as `lang="ts"` in the `<script>` tag

- After making changes, run your **Vite development server** (`vite dev`) and thoroughly test your application to ensure everything works as expected.
- If you had **TypeScript-specific dependencies**, consider removing them from your `package.json` file

## Approach with recreation of the whole JS project

- `npm install -g pnpm`
- `pnpm create vite@latest`
  - `✔ Project name: … fractalpm-v3-vue-js`
  - `✔ Select a framework: › Vue`
  - `✔ Select a variant: › JavaScript`
- `cd fractalpm-v3-vue-js`
- `pnpm install`
- `pnpm run dev`

## Code migration TS -> JS

### Enum

- `'enum' declarations can only be used in TypeScript files.ts(8006)`
- Using **Object Literal**:
  - middle approach:

```js
// TypeScript
enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

// JavaScript
const Color = {
  Red: 'RED',
  Green: 'GREEN',
  Blue: 'BLUE',
};
```

- more advanced approach would be using **Map or Object for Reverse Lookup:**

```js
// TypeScript
enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

const colorMap = new Map(Object.entries(Color));

// JavaScript
const Color = {
  Red: 'RED',
  Green: 'GREEN',
  Blue: 'BLUE',
};

const colorMap = new Map(Object.entries(Color));
```

### Interface

`'interface' declarations can only be used in TypeScript files.ts(8006)`

<https://marketplace.visualstudio.com/items?itemName=oouo-diogo-perdigao.docthis>