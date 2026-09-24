import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Input } from '../../atoms/input/input'
import { Label } from '../../atoms/label/label'
import { FormHelperText } from '../../molecules/form-helper-text/form-helper-text'
import { Wizard } from './wizard'

const meta = {
  title: 'Organisms/Wizard',
  component: Wizard,
  tags: ['autodocs'],
  args: { steps: [] }
} satisfies Meta<typeof Wizard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="w-[32rem]">
      <Wizard
        steps={[
          {
            title: 'Account',
            description: 'Basic info',
            content: (
              <div className="grid gap-1.5 py-2">
                <Label htmlFor="w-email">Email</Label>
                <Input id="w-email" type="email" placeholder="you@example.com" />
              </div>
            )
          },
          {
            title: 'Payment',
            description: 'Billing details',
            content: (
              <div className="grid gap-1.5 py-2">
                <Label htmlFor="w-card">Card number</Label>
                <Input id="w-card" placeholder="4242 4242 4242 4242" />
              </div>
            )
          },
          {
            title: 'Review',
            description: 'Confirm',
            content: (
              <p className="text-muted-foreground py-2 text-sm">
                Review your order and click Finish to confirm.
              </p>
            )
          }
        ]}
        onFinish={() => alert('Wizard finished!')}
      />
    </div>
  )
}

export const WithValidation: Story = {
  name: 'With a blocking validation step',
  render: function Render() {
    const [email, setEmail] = useState('')
    const [touched, setTouched] = useState(false)
    const isValid = /\S+@\S+\.\S+/.test(email)

    return (
      <div className="w-[32rem]">
        <Wizard
          steps={[
            {
              title: 'Account',
              description: 'Basic info',
              content: (
                <div className="grid gap-1.5 py-2">
                  <Label htmlFor="wv-email">Email</Label>
                  <Input
                    id="wv-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    aria-invalid={touched && !isValid}
                  />
                  {touched && !isValid && (
                    <FormHelperText variant="error">
                      Enter a valid email to continue.
                    </FormHelperText>
                  )}
                </div>
              ),
              validate: () => {
                setTouched(true)
                return isValid
              }
            },
            {
              title: 'Done',
              description: 'All set',
              content: (
                <p className="text-muted-foreground py-2 text-sm">
                  You can't reach this step without a valid email.
                </p>
              )
            }
          ]}
        />
      </div>
    )
  }
}
