import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { FilterBar } from '@ui/molecules/filter-bar/filter-bar'
import { describe, expect, test, vi } from 'vitest'
describe('FilterBar', () => {
  test('updates search and clears filters', async () => {
    const user = userEvent.setup()
    const onSearchChange = vi.fn()
    const onClear = vi.fn()
    render(<FilterBar search="old" onSearchChange={onSearchChange} onClear={onClear} />)
    await user.type(screen.getByRole('textbox', { name: 'Search' }), 'x')
    expect(onSearchChange).toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: /clear filters/i }))
    expect(onClear).toHaveBeenCalledOnce()
  })
})
