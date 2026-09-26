import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { DateTimeRangePicker } from '@ui/organisms/date-time-range-picker/date-time-range-picker'
import { KanbanBoard } from '@ui/organisms/kanban-board/kanban-board'

describe('date-time range picker', () => {
  test('opens with a default range and exposes the time controls', async () => {
    const user = userEvent.setup()
    render(
      <DateTimeRangePicker
        defaultValue={{
          from: new Date(2026, 8, 12, 9, 30),
          to: new Date(2026, 8, 15, 17, 0)
        }}
        hourFormat="24"
        showSeconds
      />
    )

    await user.click(screen.getByRole('button', { name: /09:30.*17:00/i }))
    expect(screen.getByText('Start time')).toBeVisible()
    expect(screen.getByText('End time')).toBeVisible()
    expect(screen.getAllByRole('listbox', { name: 'Hours' })).toHaveLength(2)
    expect(screen.getAllByRole('listbox', { name: 'Seconds' })).toHaveLength(2)
    expect(screen.getByRole('button', { name: 'Apply' })).toBeEnabled()
  })
})

type Card = { id: string; title: string; column: 'todo' | 'done' }

describe('kanban board', () => {
  test('renders columns, counts, cards, and empty states', () => {
    const cards: Card[] = [
      { id: 'one', title: 'First task', column: 'todo' },
      { id: 'two', title: 'Finished task', column: 'done' }
    ]

    render(
      <KanbanBoard
        columns={[
          { id: 'todo', title: 'To do', count: 1 },
          { id: 'done', title: 'Done', count: 1 },
          { id: 'empty', title: 'Empty', count: 0 }
        ]}
        items={cards}
        getItemId={card => card.id}
        getItemColumn={card => card.column}
        onItemMove={vi.fn()}
        renderItem={card => <span>{card.title}</span>}
      />
    )

    expect(screen.getByRole('region', { name: 'To do' })).toHaveTextContent('First task')
    expect(screen.getByRole('region', { name: 'Done' })).toHaveTextContent('Finished task')
    expect(screen.getByRole('region', { name: 'Empty' })).toHaveTextContent('No cards')
  })
})
