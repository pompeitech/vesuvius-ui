import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

// Stories live co-located next to the components they document, inside
// packages/ui — this app is only the Storybook runner/config pointing at
// them, so nothing needs to be duplicated here.
//
// Scoped to shipped tiers only — other molecules/organisms stories exist
// on disk but aren't part of a release yet — broaden this list as each
// component ships, in step with src/index.ts and tsup.config.ts.
//
// @pompeitech/vesuvius-ui's package.json now points "main"/"exports" at its *built*
// dist/ (see M12: it's a real, npm-publishable package), which would mean
// re-running `pnpm build` before every story reload — dead slow for local
// dev. The alias below overrides resolution back to source, same as
// before the build was added, so Storybook keeps getting instant HMR;
// published consumers still get the dist build via the package.json
// `exports` map untouched here.
const config: StorybookConfig = {
  stories: [
    '../../../packages/ui/src/atoms/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/accordion/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/alert-dialog/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/avatar-group/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/breadcrumb/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/collapsible/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/combobox/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/command/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/confirm-dialog/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/copy-button/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/dialog/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/dropdown-menu/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/empty-state/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/file-preview/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/file-uploader/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/filter-bar/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/form-helper-text/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/grid/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/header/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/input-group/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/list/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/notification-center/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/pagination/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/popover/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/select/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/sheet/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/sidebar/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/stack/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/stepper/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/table/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/tabs/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/theme-switcher/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/toast/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/toggle/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/toggle-group/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/tooltip/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ui/src/molecules/user-avatar/**/*.stories.@(ts|tsx|mdx)'
  ],
  addons: ['@storybook/addon-a11y', '@storybook/addon-themes'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      resolve: {
        alias: [
          {
            // A plain string key here prefix-matches — "@pompeitech/vesuvius-ui/styles.css"
            // would also hit it and get mangled into ".../index.ts/styles.css"
            // (only surfaces in `storybook build`'s Rolldown bundler, not
            // `storybook dev`'s esbuild resolver — caught by actually running
            // the build, not just dev). An anchored regexp matches only the
            // bare specifier, leaving the "./styles.css" subpath export
            // (already source-based, untouched) to resolve normally.
            find: /^@pompeitech\/vesuvius-ui$/,
            replacement: fileURLToPath(
              new URL('../../../packages/ui/src/index.ts', import.meta.url)
            )
          }
        ]
      }
    })
  }
}

export default config
