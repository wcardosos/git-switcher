import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test file patterns
    include: [
      'tests/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**'],

    // Environment
    environment: 'node',
    globals: true,

    // Execution
    pool: 'forks',
    fileParallelism: true,
    testTimeout: 5000,
    hookTimeout: 10_000,

    // Reporters
    reporters: ['default'],

    // Coverage
    coverage: {
      provider: 'v8',
      enabled: false,
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.spec.ts', '**/types/**', '**/index.ts'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },

    // Mocking behavior
    clearMocks: true,
    restoreMocks: true,

    // Sequencing
    sequence: {
      shuffle: false,
      concurrent: false,
    },
  },
});
