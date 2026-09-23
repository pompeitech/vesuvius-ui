import { render, screen } from '@testing-library/react'
import { UserAvatar } from '@ui/molecules/user-avatar/user-avatar'
import { describe, expect, test } from 'vitest'

describe('UserAvatar', () => {
  test('renders deterministic initials', () => {
    render(<UserAvatar name="Ada Lovelace" />)
    expect(screen.getByText('AL')).toBeInTheDocument()
  })
})
