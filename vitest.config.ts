// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['node_modules', 'docs', 'examples'],
  },
});
