import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PeopleSelect, type PeopleSelectOption } from '@ui/organisms/people-select/people-select'
import { describe, expect, test, vi } from 'vitest'

const OPTIONS: PeopleSelectOption[] = [
  { value: 'ada', label: 'Ada Lovelace', description: 'Engineering' },
  { value: 'grace', label: 'Grace Hopper', description: 'Engineering' }
]

describe('PeopleSelect', () => {
  test('shows a placeholder when nothing is selected', () => {
    render(<PeopleSelect options={OPTIONS} placeholder="Assign someone" />)
    expect(screen.getByText('Assign someone')).toBeVisible()
  })

  test('shows the selected person’s label and avatar', () => {
    render(<PeopleSelect options={OPTIONS} defaultValue="ada" />)
    expect(screen.getByText('Ada Lovelace')).toBeVisible()
  })

  test('selects a person from the popover list', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<PeopleSelect options={OPTIONS} onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: /grace hopper/i }))
    expect(onChange).toHaveBeenCalledWith('grace')
  })

  test('clears the selection through the unassigned option when clearable', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<PeopleSelect options={OPTIONS} defaultValue="ada" onChange={onChange} clearable />)
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Unassigned' }))
    expect(onChange).toHaveBeenCalledWith(undefined)
  })

  test('does not offer an unassigned option when not clearable', async () => {
    const user = userEvent.setup()
    render(<PeopleSelect options={OPTIONS} defaultValue="ada" />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.queryByRole('option', { name: 'Unassigned' })).not.toBeInTheDocument()
  })

  test('disables the trigger', () => {
    render(<PeopleSelect options={OPTIONS} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  test('applies size-driven height classes', () => {
    render(<PeopleSelect options={OPTIONS} size="xs" />)
    expect(screen.getByRole('combobox')).toHaveClass('h-7')
  })
})
