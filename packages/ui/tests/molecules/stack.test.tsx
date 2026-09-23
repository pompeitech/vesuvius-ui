import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Stack } from '@ui/molecules/stack'

describe('stack', () => {
  test('renders children in a stack', () => {
    render(
      <Stack>
        <span>One</span>
        <span>Two</span>
      </Stack>
    )
    expect(screen.getByText('One')).toBeVisible()
    expect(screen.getByText('Two')).toBeVisible()
  })
})
