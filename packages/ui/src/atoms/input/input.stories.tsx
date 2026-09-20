import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './input'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs']
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Email' }
}

export const Sizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Input size="xs" aria-label="Extra small input" placeholder="Extra small" />
      <Input size="sm" aria-label="Small input" placeholder="Small" />
      <Input size="default" aria-label="Default input" placeholder="Default" />
      <Input size="lg" aria-label="Large input" placeholder="Large" />
    </div>
  )
}

export const Disabled: Story = {
  args: { placeholder: 'Email', disabled: true }
}

export const Invalid: Story = {
  args: {
    placeholder: 'Email',
    'aria-invalid': true,
    defaultValue: 'not-an-email'
  }
}

// type="file" ignores placeholder — needs an explicit aria-label.
export const File: Story = {
  args: { type: 'file', 'aria-label': 'Upload a file' }
}
