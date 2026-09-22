import type { Meta, StoryObj } from '@storybook/react-vite'
import { PasswordInput } from './password-input'

const meta = {
  title: 'Atoms/Password Input',
  component: PasswordInput,
  tags: ['autodocs']
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'Enter your password' }
}

export const WithValue: Story = {
  args: { defaultValue: 'super-secret' }
}

export const Sizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <PasswordInput size="xs" aria-label="Extra small password" placeholder="Extra small" />
      <PasswordInput size="sm" aria-label="Small password" placeholder="Small" />
      <PasswordInput size="default" aria-label="Default password" placeholder="Default" />
      <PasswordInput size="lg" aria-label="Large password" placeholder="Large" />
    </div>
  )
}

export const Disabled: Story = {
  args: { defaultValue: 'super-secret', disabled: true }
}
