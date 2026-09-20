import { render, screen } from '@testing-library/react'
import { Badge } from '@ui/atoms/badge/badge'
import { describe, expect, test } from 'vitest'

describe('Badge', () => {
  test('supports variants and rendering as a link', () => {
    render(
      <Badge variant="success" asChild>
        <a href="/status">Online</a>
      </Badge>
    )
    expect(screen.getByRole('link', { name: 'Online' })).toHaveAttribute('data-slot', 'badge')
  })
})
