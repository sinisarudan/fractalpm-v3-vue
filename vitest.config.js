// https://vitejs.dev/config/

import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
import { fileURLToPath } from 'node:url';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true, // global variables should be available during testing. This can be useful if you have global dependencies.
    environment: 'jsdom',
    deps: {
      inline: ['vuetify']
    },
    exclude: [
      // 'packages/template/*',
      ...configDefaults.exclude,
      'e2e/*',
      'DevOps/*',
      'DevOps/e2e-tests-examples/*',
      // 'tests' // e2e - playwright
      // '**/UserService.spec.js',
    ],
    root: fileURLToPath(new URL('./', import.meta.url)),
    coverage: {
      provider: 'v8', // or 'istanbul',
      reporter: ['text', 'json', 'html']
    }
  }
}));
