import { render, screen } from '@testing-library/react'
import { Typography } from '@ui/atoms/typography/typography'
import { describe, expect, test } from 'vitest'

describe('Typography', () => {
  test('can change rendered element independently of variant', () => {
    render(
      <Typography variant="h2" as="div">
        Section title
      </Typography>
    )
    const heading = screen.getByText('Section title')
    expect(heading.tagName).toBe('DIV')
    expect(heading).toHaveAttribute('data-variant', 'h2')
  })
})
