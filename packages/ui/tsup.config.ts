import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/theme/theme-provider.tsx',
    'src/atoms/*/index.ts',
    // Molecules ship one batch at a time — list each shipped one explicitly
    // rather than globbing 'src/molecules/*/index.ts', so an in-progress
    // molecule can't accidentally end up in a published build.
    'src/molecules/select/index.ts',
    'src/molecules/list/index.ts'
    // 'src/organisms/*/index.ts' — re-add once organisms ship
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
