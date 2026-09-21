import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/molecules/select'

describe('select', () => {
  test('opens and selects an option', () => {
    render(
      <Select>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    )
    fireEvent.click(screen.getByRole('combobox', { name: 'Fruit' }))
    expect(screen.getByRole('option', { name: 'Apple' })).toBeVisible()
  })
})
