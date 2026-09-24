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
    // Scoped to shipped components only — the rest of tests/molecules and
    // tests/organisms exist on disk but their components' deps aren't in
    // package.json until they ship. Broaden this as each one lands (see
    // src/index.ts).
    include: [
      'tests/atoms/**/*.test.{ts,tsx}',
      'tests/molecules/accordion.test.{ts,tsx}',
      'tests/molecules/alert-dialog.test.{ts,tsx}',
      'tests/molecules/avatar-group.test.{ts,tsx}',
      'tests/molecules/breadcrumb.test.{ts,tsx}',
      'tests/molecules/chart-card.test.{ts,tsx}',
      'tests/molecules/collapsible.test.{ts,tsx}',
      'tests/molecules/combobox.test.{ts,tsx}',
      'tests/molecules/command.test.{ts,tsx}',
      'tests/molecules/confirm-dialog.test.{ts,tsx}',
      'tests/molecules/context-menu.test.{ts,tsx}',
      'tests/molecules/copy-button.test.{ts,tsx}',
      'tests/molecules/dialog.test.{ts,tsx}',
      'tests/molecules/dropdown-menu.test.{ts,tsx}',
      'tests/molecules/empty-state.test.{ts,tsx}',
      'tests/molecules/file-preview.test.{ts,tsx}',
      'tests/molecules/file-uploader.test.{ts,tsx}',
      'tests/molecules/filter-bar.test.{ts,tsx}',
      'tests/molecules/form-helper-text.test.{ts,tsx}',
      'tests/molecules/grid.test.{ts,tsx}',
      'tests/molecules/header.test.{ts,tsx}',
      'tests/molecules/input-group.test.{ts,tsx}',
      'tests/molecules/list.test.{ts,tsx}',
      'tests/molecules/navigation-menu.test.{ts,tsx}',
      'tests/molecules/notification-center.test.{ts,tsx}',
      'tests/molecules/pagination.test.{ts,tsx}',
      'tests/molecules/popover.test.{ts,tsx}',
      'tests/molecules/select.test.{ts,tsx}',
      'tests/molecules/sheet.test.{ts,tsx}',
      'tests/molecules/sidebar.test.{ts,tsx}',
      'tests/molecules/stack.test.{ts,tsx}',
      'tests/molecules/stat-card.test.{ts,tsx}',
      'tests/molecules/stepper.test.{ts,tsx}',
      'tests/molecules/table.test.{ts,tsx}',
      'tests/molecules/tabs.test.{ts,tsx}',
      'tests/molecules/theme-palette-picker.test.{ts,tsx}',
      'tests/molecules/theme-switcher.test.{ts,tsx}',
      'tests/molecules/toast.test.{ts,tsx}',
      'tests/molecules/toggle.test.{ts,tsx}',
      'tests/molecules/toggle-group.test.{ts,tsx}',
      'tests/molecules/tooltip.test.{ts,tsx}',
      'tests/molecules/user-avatar.test.{ts,tsx}',
      'tests/organisms/calendar.test.{ts,tsx}',
      'tests/organisms/chart-container.test.{ts,tsx}',
      'tests/organisms/chart-legend.test.{ts,tsx}',
      'tests/organisms/chart-tooltip.test.{ts,tsx}',
      'tests/organisms/chart-utils.test.{ts,tsx}',
      'tests/organisms/date-picker.test.{ts,tsx}',
      'tests/organisms/date-range-picker.test.{ts,tsx}',
      'tests/organisms/date-time-picker.test.{ts,tsx}',
      'tests/organisms/date-time-range-picker.test.{ts,tsx}',
      'tests/organisms/heatmap-grid.test.{ts,tsx}',
      'tests/organisms/radial-progress-chart.test.{ts,tsx}',
      'tests/organisms/simple-charts.test.{ts,tsx}',
      'tests/organisms/simple-radar-chart.test.{ts,tsx}',
      'tests/organisms/sparkline.test.{ts,tsx}',
      'tests/organisms/time-picker.utils.test.{ts,tsx}'
    ]
  }
})
