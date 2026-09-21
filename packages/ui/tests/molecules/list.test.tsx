import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { List, ListItem } from '@ui/molecules/list'

describe('list', () => {
  test('renders leading and trailing slots', () => {
    render(
      <List>
        <ListItem leading={<span>Leading</span>} trailing={<span>Trailing</span>}>
          Account settings
        </ListItem>
      </List>
    )
    expect(screen.getByText('Leading')).toBeVisible()
    expect(screen.getByText('Account settings')).toBeVisible()
    expect(screen.getByText('Trailing')).toBeVisible()
  })
  test('supports dense items', () => {
    render(<ListItem dense>Compact item</ListItem>)
    expect(screen.getByText('Compact item')).toBeVisible()
  })
})
