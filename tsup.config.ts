import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'], // Output ESM formats
  dts: true, // Generate TypeScript declaration files
  clean: true, // Clean the output directory before each build
  sourcemap: true, // Generate source maps for better debugging
  minify: true, // Minify the output for optimized performance
});
