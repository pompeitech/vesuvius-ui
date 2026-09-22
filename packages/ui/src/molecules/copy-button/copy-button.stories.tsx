import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopyButton } from './copy-button'

const meta = {
  title: 'Molecules/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  args: { value: 'npm install @pompeitech/vesuvius-ui' }
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
