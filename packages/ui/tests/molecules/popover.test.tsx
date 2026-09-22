import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Popover, PopoverContent, PopoverTrigger } from '@ui/molecules/popover'

describe('popover', () => {
  test('opens content from its trigger', () => {
    render(
      <Popover>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Open popover' }))
    expect(screen.getByText('Popover content')).toBeVisible()
  })
})
