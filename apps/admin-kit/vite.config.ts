import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// @pompeitech/vesuvius-ui's package.json points "main"/"exports" at its *built* dist/
// (it's a real, npm-publishable package — see packages/ui/README.md), which
// would mean re-running `pnpm build` before every change shows up here.
// The alias below overrides resolution back to source for local dev, same
// approach as apps/storybook/.storybook/main.ts.
//
// IMPORTANT: this must stay an anchored RegExp, not a plain string key —
// a plain string does prefix-matching in Vite/Rolldown's production
// builder, which would also swallow "@pompeitech/vesuvius-ui/styles.css" and mangle
// it into ".../index.ts/styles.css". That subpath is already source-based
// (see @pompeitech/vesuvius-ui's package.json `exports["./styles.css"]`), so it must
// be left alone to resolve normally.
// VITE_BASE_PATH lets this app build for a sub-path deploy (e.g. served at
// /admin-dashboard/ inside apps/docs) without affecting its normal standalone
// deploy at "/". See apps/docs/README or the "docs" package.json script.
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^@pompeitech\/vesuvius-ui$/,
        replacement: fileURLToPath(new URL('../../packages/ui/src/index.ts', import.meta.url))
      },
      {
        find: '@admin/form',
        replacement: fileURLToPath(new URL('./src/components/form/index.ts', import.meta.url))
      }
    ]
  }
})
