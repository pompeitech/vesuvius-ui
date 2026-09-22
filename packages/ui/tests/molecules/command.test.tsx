import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Command, CommandInput, CommandItem, CommandList } from '@ui/molecules/command'

describe('command', () => {
  test('renders searchable commands', () => {
    render(
      <Command>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandItem>Calendar</CommandItem>
        </CommandList>
      </Command>
    )
    expect(screen.getByPlaceholderText('Search')).toBeVisible()
    expect(screen.getByText('Calendar')).toBeVisible()
  })
})
