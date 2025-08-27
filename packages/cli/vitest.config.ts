import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname),
  test: {
    globals: true,
    environment: 'node',
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '../src': path.resolve(__dirname, 'src'),
    },
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
