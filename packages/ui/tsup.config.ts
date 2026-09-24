import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/theme/theme-provider.tsx',
    'src/atoms/*/index.ts',
    // Molecules ship one batch at a time — list each shipped one explicitly
    // rather than globbing 'src/molecules/*/index.ts', so an in-progress
    // molecule can't accidentally end up in a published build.
    'src/molecules/accordion/index.ts',
    'src/molecules/alert-dialog/index.ts',
    'src/molecules/avatar-group/index.ts',
    'src/molecules/breadcrumb/index.ts',
    'src/molecules/chart-card/index.ts',
    'src/molecules/collapsible/index.ts',
    'src/molecules/combobox/index.ts',
    'src/molecules/command/index.ts',
    'src/molecules/confirm-dialog/index.ts',
    'src/molecules/context-menu/index.ts',
    'src/molecules/copy-button/index.ts',
    'src/molecules/dialog/index.ts',
    'src/molecules/dropdown-menu/index.ts',
    'src/molecules/empty-state/index.ts',
    'src/molecules/file-preview/index.ts',
    'src/molecules/file-uploader/index.ts',
    'src/molecules/filter-bar/index.ts',
    'src/molecules/form-helper-text/index.ts',
    'src/molecules/grid/index.ts',
    'src/molecules/header/index.ts',
    'src/molecules/input-group/index.ts',
    'src/molecules/list/index.ts',
    'src/molecules/navigation-menu/index.ts',
    'src/molecules/notification-center/index.ts',
    'src/molecules/pagination/index.ts',
    'src/molecules/popover/index.ts',
    'src/molecules/select/index.ts',
    'src/molecules/sheet/index.ts',
    'src/molecules/sidebar/index.ts',
    'src/molecules/stack/index.ts',
    'src/molecules/stat-card/index.ts',
    'src/molecules/stepper/index.ts',
    'src/molecules/table/index.ts',
    'src/molecules/tabs/index.ts',
    'src/molecules/theme-switcher/index.ts',
    'src/molecules/toast/index.ts',
    'src/molecules/toggle/index.ts',
    'src/molecules/toggle-group/index.ts',
    'src/molecules/tooltip/index.ts',
    'src/molecules/user-avatar/index.ts',
    // Organisms ship one batch at a time too, same discipline as molecules.
    'src/organisms/calendar/index.ts',
    'src/organisms/charts/index.ts',
    'src/organisms/date-picker/index.ts',
    'src/organisms/date-range-picker/index.ts',
    'src/organisms/date-time-picker/index.ts',
    'src/organisms/date-time-range-picker/index.ts',
    'src/organisms/kanban-board/index.ts',
    'src/organisms/multi-select/index.ts',
    'src/organisms/people-select/index.ts',
    'src/organisms/rich-text-editor/index.ts',
    'src/organisms/time-picker/index.ts',
    'src/organisms/timeline/index.ts',
    'src/organisms/tree-view/index.ts',
    'src/organisms/wizard/index.ts'
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
