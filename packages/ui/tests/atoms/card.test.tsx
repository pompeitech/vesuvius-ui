import { render, screen } from '@testing-library/react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@ui/atoms/card/card'
import { describe, expect, test } from 'vitest'

describe('Card', () => {
  test('exposes structural slots', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Profile settings</CardDescription>
          <CardAction>More</CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    expect(screen.getByText('Account')).toHaveAttribute('data-slot', 'card-title')
    expect(screen.getByText('Profile settings')).toHaveAttribute('data-slot', 'card-description')
    expect(screen.getByText('More')).toHaveAttribute('data-slot', 'card-action')
    expect(screen.getByText('Content')).toHaveAttribute('data-slot', 'card-content')
    expect(screen.getByText('Footer')).toHaveAttribute('data-slot', 'card-footer')
  })
})
