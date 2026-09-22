import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ToggleGroup, ToggleGroupItem } from '@ui/molecules/toggle-group'

describe('toggle group', () => {
  test('supports a selected item', () => {
    render(
      <ToggleGroup type="single" defaultValue="bold">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>
    )
    expect(screen.getByRole('radio', { name: 'Bold' })).toHaveAttribute('data-state', 'on')
  })
})
