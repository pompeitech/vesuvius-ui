import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Combobox } from '@ui/molecules/combobox'

describe('combobox', () => {
  test('renders the selectable control', () => {
    render(
      <Combobox
        options={[{ value: 'engineering', label: 'Engineering' }]}
        placeholder="Select a team"
      />
    )
    expect(screen.getByRole('combobox')).toBeVisible()
  })
})
