import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Stepper, type StepperStep } from './stepper'

const meta = {
  title: 'Molecules/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  args: { steps: [], activeStep: 0 }
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

const STEPS: StepperStep[] = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Tell us about yourself' },
  { title: 'Payment', description: 'Add a payment method' },
  { title: 'Review', description: 'Confirm and finish' }
]

export const Horizontal: Story = {
  args: { steps: STEPS, activeStep: 1 }
}

export const Vertical: Story = {
  render: () => (
    <div className="w-64">
      <Stepper steps={STEPS} activeStep={1} orientation="vertical" />
    </div>
  )
}

export const WithError: Story = {
  args: {
    steps: [
      { title: 'Account' },
      { title: 'Profile', status: 'error' },
      { title: 'Payment' },
      { title: 'Review' }
    ],
    activeStep: 1
  }
}

export const Clickable: Story = {
  name: 'Clickable (non-linear)',
  render: function Render() {
    const [active, setActive] = useState(0)
    return <Stepper steps={STEPS} activeStep={active} onStepClick={setActive} />
  }
}
