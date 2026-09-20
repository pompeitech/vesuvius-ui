import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertTriangle, CheckCircle2, ChevronRight, Terminal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../card/card'
import { Alert, AlertDescription, AlertTitle } from './alert'

const meta = {
  title: 'Atoms/Alert',
  component: Alert,
  tags: ['autodocs']
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <Terminal />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the CLI.
      </AlertDescription>
    </Alert>
  )
}

export const Success: Story = {
  render: () => (
    <Alert variant="success" className="w-96">
      <CheckCircle2 />
      <AlertTitle>Order confirmed</AlertTitle>
      <AlertDescription>Your order has been placed successfully.</AlertDescription>
    </Alert>
  )
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertTriangle />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>Your payment could not be processed. Please try again.</AlertDescription>
    </Alert>
  )
}

export const SoftAppearance: Story = {
  name: 'appearance="soft" (tinted background, dashboard-style callout)',
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Card>
        <CardHeader>
          <CardTitle>Needs Attention</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" appearance="soft">
            <AlertTitle>API Stabilization is blocked</AlertTitle>
            <AlertDescription>
              13 open issues are delaying Customer Onboarding Flow and the next launch readiness
              review.
            </AlertDescription>
            <a
              href="/projects/api-stabilization"
              className="text-destructive col-start-2 mt-1 inline-flex items-center gap-0.5 text-sm font-medium hover:underline"
            >
              View details
              <ChevronRight className="size-3.5" />
            </a>
          </Alert>
        </CardContent>
      </Card>
      <Alert variant="success" appearance="soft">
        <CheckCircle2 />
        <AlertTitle>Order confirmed</AlertTitle>
        <AlertDescription>Your order has been placed successfully.</AlertDescription>
      </Alert>
      <Alert variant="warning" appearance="soft">
        <AlertTriangle />
        <AlertTitle>Usage approaching limit</AlertTitle>
        <AlertDescription>85% of your monthly quota has been used.</AlertDescription>
      </Alert>
    </div>
  )
}
