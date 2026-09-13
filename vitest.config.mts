import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// tsconfig maps `react` -> `./node_modules/@types/react` so the app typechecks
// against a single copy of the React types. That mapping is for the compiler
// only — tsconfig path resolution would otherwise apply it at runtime and hand
// the test bundle a types-only package. Vite resolves aliases before tsconfig
// paths, so pinning `react` here keeps the real runtime package.
const reactRuntime = fileURLToPath(new URL('./node_modules/react', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Vite 8 resolves tsconfig `paths` natively — no vite-tsconfig-paths needed.
    tsconfigPaths: true,
    alias: [{ find: /^react$/, replacement: reactRuntime }],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/int/**/*.int.spec.ts', 'tests/int/**/*.int.spec.tsx'],
  },
})
