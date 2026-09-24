import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MultiSelect, type MultiSelectOption } from '@ui/organisms/multi-select/multi-select'
import { describe, expect, test, vi } from 'vitest'

const OPTIONS: MultiSelectOption[] = [
  { label: 'Sales', value: 'sales' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Engineering', value: 'engineering' }
]

describe('MultiSelect', () => {
  test('shows a placeholder when nothing is selected', () => {
    render(<MultiSelect options={OPTIONS} placeholder="Pick departments" aria-label="Departments" />)
    expect(screen.getByText('Pick departments')).toBeVisible()
  })

  test('renders a chip per selected value with a remove button', () => {
    render(
      <MultiSelect
        options={OPTIONS}
        defaultValue={['sales', 'marketing']}
        aria-label="Departments"
      />
    )
    expect(screen.getByText('Sales')).toBeVisible()
    expect(screen.getByText('Marketing')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Remove Sales' })).toBeVisible()
  })

  test('collapses extra selections into a "+N more" badge', () => {
    render(
      <MultiSelect
        options={OPTIONS}
        defaultValue={['sales', 'marketing', 'engineering']}
        maxDisplay={1}
        aria-label="Departments"
      />
    )
    expect(screen.getByText('+2 more')).toBeVisible()
  })

  test('toggles an option on and off via the popover list', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <MultiSelect
        options={OPTIONS}
        defaultValue={[]}
        onValueChange={onValueChange}
        aria-label="Departments"
      />
    )
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: 'Sales' }))
    expect(onValueChange).toHaveBeenCalledWith(['sales'])
  })

  test('removes a value when its chip remove button is clicked', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <MultiSelect
        options={OPTIONS}
        defaultValue={['sales']}
        onValueChange={onValueChange}
        aria-label="Departments"
      />
    )
    await user.click(screen.getByRole('button', { name: 'Remove Sales' }))
    expect(onValueChange).toHaveBeenCalledWith([])
  })

  test('disables the trigger', () => {
    render(<MultiSelect options={OPTIONS} disabled aria-label="Departments" />)
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true')
  })

  test('applies size-driven height classes', () => {
    render(<MultiSelect options={OPTIONS} size="lg" aria-label="Departments" />)
    expect(screen.getByRole('combobox')).toHaveClass('h-10')
  })
})
