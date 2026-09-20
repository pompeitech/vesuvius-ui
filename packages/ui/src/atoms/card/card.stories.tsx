import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './card'

const meta = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs']
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Monthly revenue</CardTitle>
        <CardDescription>February 2026</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">$189,540.75</p>
        <p className="text-muted-foreground text-sm">+27.9% vs previous month</p>
      </CardContent>
      <CardFooter className="border-t">
        <p className="text-muted-foreground text-xs">Last updated just now</p>
      </CardFooter>
    </Card>
  )
}
