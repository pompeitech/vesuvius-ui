import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/molecules/tabs'

describe('tabs', () => {
  test('renders the active tab content', () => {
    render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account content</TabsContent>
        <TabsContent value="billing">Billing content</TabsContent>
      </Tabs>
    )
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('data-state', 'active')
    expect(screen.getByText('Account content')).toBeVisible()
  })
})
