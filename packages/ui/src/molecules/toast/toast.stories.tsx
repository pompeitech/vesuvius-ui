import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../atoms/button/button'
import { ThemeProvider } from '../../theme/theme-provider'
import { toast, Toaster } from './index'

// Toaster reads the active mode via useTheme(), so it needs its own
// ThemeProvider here — the Storybook toolbar's dark-mode toggle only
// flips the `.dark` class directly, it doesn't drive our React context.
const meta = {
  title: 'Molecules/Toast',
  component: Toaster,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
        <Toaster />
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast('Event has been created', {
          description: 'Sunday, December 3rd at 9:00am',
          action: { label: 'Undo', onClick: () => {} }
        })
      }
    >
      Show toast
    </Button>
  )
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast.success('Saved successfully')}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error('Something went wrong')}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.warning('Check your input')}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.info('New update available')}>
        Info
      </Button>
    </div>
  )
}
