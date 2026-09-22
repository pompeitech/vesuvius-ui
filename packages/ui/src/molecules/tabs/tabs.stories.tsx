import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardContent, CardHeader, CardTitle } from '../../atoms/card/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

const meta = {
  title: 'Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs']
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-96">
      <TabsList className="w-full">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Make changes to your account here.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Change your password here.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
