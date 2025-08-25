import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig as defineVitestConfig } from 'vitest/config';

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
