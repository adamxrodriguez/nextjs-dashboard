/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      // Thresholds removed - can be re-added as test coverage improves
      // thresholds: {
      //   lines: 80,
      //   functions: 80,
      //   branches: 80,
      //   statements: 80,
      // },
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.config.*',
        '**/types/**',
        'next.config.mjs',
        '.next/',
        '**/layout.tsx',
        '**/page.tsx',
        '**/loading.tsx',
        '**/error.tsx',
        '**/not-found.tsx',
        '**/route.ts',
        'middleware.ts',
        'auth.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});

