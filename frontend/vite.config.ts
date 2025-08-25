import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve as _resolve } from 'path';
import { defineConfig as _defineVitestConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/tests/**/*.test.{ts,tsx}'],
    setupFiles: './src/vitest.setup.ts',
    coverage: {
      provider: 'v8',   // <-- uses @vitest/coverage-v8
      reporter: ['text', 'lcov'],
    },
  },
})
