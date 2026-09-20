import { render, screen } from '@testing-library/react'
import { Avatar, AvatarFallback } from '@ui/atoms/avatar/avatar'
import { describe, expect, test } from 'vitest'

describe('Avatar', () => {
  test('renders fallback content', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText('JD')).toHaveAttribute('data-slot', 'avatar-fallback')
  })
})
