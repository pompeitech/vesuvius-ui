import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Stories live alongside the components they document under ./src
      // (same convention apps/storybook's config.ts follows). Tests import
      // *.stories.tsx directly and render them with React Testing Library
      // via Storybook's portable-stories API — no Storybook build, no
      // browser: everything runs in jsdom inside this Vitest process.
      {
        find: '@ui',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      }
    ]
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: false,
    restoreMocks: true,
    // Scoped to atoms for the v0.1.0 release — tests/molecules and
    // tests/organisms exist on disk but their components' deps were
    // trimmed from package.json until those tiers ship. Broaden this
    // as each tier lands (see src/index.ts).
    include: ['tests/atoms/**/*.test.{ts,tsx}']
  }
})
