import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'bin',
  splitting: false,
  sourcemap: false, // cli does not need sourcemaps
  clean: true,
  watch: true,
});