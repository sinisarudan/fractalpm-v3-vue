/**
 * https://vitest.dev/config/
 */

import {configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
import { fileURLToPath } from 'node:url'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true, //global variables should be available during testing. This can be useful if you have global dependencies.
    environment: 'jsdom',
    deps: {
      inline: ['vuetify'],
    },
    exclude: [
      // 'packages/template/*',
      ...configDefaults.exclude,
      'e2e/*', 
      'tests', // e2e - playwright
      'tests-examples', // e2e - playwright
      // '**/RimaService.spec.ts',
      // '**/UserSelectorVue.spec.ts',
      // '**/ManageTeamVue.spec.ts',
      // '**/src/components/__tests__/RimaService.spec.ts',
    ],
    root: fileURLToPath(new URL('./', import.meta.url)),
    coverage: {
      provider: 'v8', // or 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
  },
}))