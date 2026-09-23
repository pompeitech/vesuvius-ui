import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '../../atoms/input/input'
import { Label } from '../../atoms/label/label'
import { FormHelperText } from './form-helper-text'

const meta = {
  title: 'Molecules/FormHelperText',
  component: FormHelperText,
  tags: ['autodocs'],
  args: { children: 'Helper text' }
} satisfies Meta<typeof FormHelperText>

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <FormHelperText variant="default">
        We'll never share your email with anyone else.
      </FormHelperText>
      <FormHelperText variant="info">Your plan renews on the 1st of every month.</FormHelperText>
      <FormHelperText variant="success">Username is available.</FormHelperText>
      <FormHelperText variant="warning">This action can't be easily undone.</FormHelperText>
      <FormHelperText variant="error">Password must be at least 8 characters.</FormHelperText>
    </div>
  )
}

export const InAFormField: Story = {
  name: 'Paired with a field (MUI FormControl-style)',
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="username">Username</Label>
      <Input id="username" defaultValue="ada_lovelace" aria-invalid={false} />
      <FormHelperText variant="success">Username is available.</FormHelperText>
    </div>
  )
}

export const ErrorState: Story = {
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" aria-invalid />
      <FormHelperText variant="error">Password must be at least 8 characters.</FormHelperText>
    </div>
  )
}
