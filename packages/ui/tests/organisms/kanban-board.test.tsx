import { render, screen } from '@testing-library/react'
import { KanbanBoard } from '@ui/organisms/kanban-board/kanban-board'
import { describe, expect, test } from 'vitest'

describe('KanbanBoard', () => {
  test('renders columns, counts and cards', () => {
    const items = [
      { id: '1', title: 'Review onboarding flow', status: 'todo', priority: 'High' },
      { id: '2', title: 'Add empty states', status: 'progress', priority: 'Medium' }
    ]
    render(
      <KanbanBoard
        columns={[
          { id: 'todo', title: 'To do', count: 1 },
          { id: 'progress', title: 'In progress', count: 1 }
        ]}
        items={items}
        getItemId={item => item.id}
        getItemColumn={item => item.status}
        onItemMove={() => undefined}
        renderItem={item => (
          <div>
            <p>{item.title}</p>
            <span>{item.priority}</span>
          </div>
        )}
      />
    )
    expect(screen.getByRole('region', { name: 'To do' })).toBeVisible()
    expect(screen.getByRole('region', { name: 'In progress' })).toBeVisible()
    expect(screen.getByText('Review onboarding flow')).toBeVisible()
    expect(screen.getAllByText('High')[0]).toBeVisible()
  })

  test('renders an empty column state', () => {
    render(
      <KanbanBoard
        columns={[{ id: 'backlog', title: 'Backlog' }]}
        items={[]}
        getItemId={() => ''}
        getItemColumn={() => 'backlog'}
        onItemMove={() => undefined}
        renderItem={() => null}
      />
    )
    expect(screen.getByRole('region', { name: 'Backlog' })).toHaveTextContent('No cards')
  })
})
