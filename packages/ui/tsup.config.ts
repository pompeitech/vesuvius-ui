import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/theme/theme-provider.tsx',
    'src/atoms/*/index.ts'
    // 'src/molecules/*/index.ts',  — re-add from v0.2.0
    // 'src/organisms/*/index.ts'   — re-add once organisms ship
  ],
  format: ['esm'],
  sourcemap: true,
  clean: true,
  target: 'es2022',
  external: ['react', 'react-dom'],
  // Stories aren't part of the published package — excluding them here
  // (belt-and-suspenders alongside not importing them from index.ts) keeps
  // Storybook-only deps like `@storybook/react-vite` out of the build.
  esbuildOptions(options) {
    options.jsx = 'automatic'
  }
})
