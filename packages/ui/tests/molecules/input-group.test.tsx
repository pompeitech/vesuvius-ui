import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { InputGroup, InputGroupInput } from '@ui/molecules/input-group'

describe('input group', () => {
  test('renders its input', () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="Search" placeholder="Search" />
      </InputGroup>
    )
    expect(screen.getByRole('textbox', { name: 'Search' })).toHaveAttribute('placeholder', 'Search')
  })
})
