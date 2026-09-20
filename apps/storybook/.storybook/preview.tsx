import '@pompeitech/vesuvius-ui/styles.css'

import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName, withThemeByDataAttribute } from '@storybook/addon-themes'
import { COLOR_THEMES } from '@pompeitech/vesuvius-ui'

const colorThemes = Object.fromEntries(COLOR_THEMES.map(name => [name, name]))

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: { disable: true },
    layout: 'centered'
  },
  decorators: [
    // Light/dark mode toggle (toolbar), toggles the `.dark` class.
    withThemeByClassName({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light'
    }),
    // Color theme picker (toolbar), sets `data-theme="…"` — independent of
    // and combinable with the light/dark toggle above, mirroring
    // @pompeitech/vesuvius-ui's ThemeProvider.
    withThemeByDataAttribute({
      themes: colorThemes,
      defaultTheme: 'lava',
      attributeName: 'data-theme'
    })
  ]
}

export default preview
