import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Badge } from '../../atoms/badge/badge'
import { KanbanBoard } from './kanban-board'

type Card = { id: string; title: string; status: string; priority: string }

const initialCards: Card[] = [
  {
    id: '1',
    title: 'Review onboarding flow',
    status: 'todo',
    priority: 'High'
  },
  {
    id: '2',
    title: 'Add empty states',
    status: 'progress',
    priority: 'Medium'
  },
  { id: '3', title: 'Publish release notes', status: 'done', priority: 'Low' },
  {
    id: '4',
    title: 'Audit keyboard navigation',
    status: 'todo',
    priority: 'High'
  }
]

const meta = {
  title: 'Organisms/KanbanBoard',
  component: KanbanBoard,
  tags: ['autodocs']
} satisfies Meta<typeof KanbanBoard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns: [],
    items: [],
    getItemId: () => '',
    getItemColumn: () => '',
    onItemMove: () => undefined,
    renderItem: () => null
  },
  render: function Render() {
    const [cards, setCards] = useState(initialCards)
    const columns = [
      {
        id: 'todo',
        title: 'To do',
        count: cards.filter(card => card.status === 'todo').length
      },
      {
        id: 'progress',
        title: 'In progress',
        count: cards.filter(card => card.status === 'progress').length
      },
      {
        id: 'done',
        title: 'Done',
        count: cards.filter(card => card.status === 'done').length
      }
    ]

    return (
      <KanbanBoard
        columns={columns}
        items={cards}
        getItemId={card => card.id}
        getItemColumn={card => card.status}
        onItemMove={(card, status) =>
          setCards(current =>
            current.map(item => (item.id === card.id ? { ...item, status } : item))
          )
        }
        renderItem={card => (
          <div className="bg-card rounded-md border p-3 shadow-sm">
            <p className="text-sm font-medium">{card.title}</p>
            <Badge variant="outline" className="mt-3 text-[10px]">
              {card.priority}
            </Badge>
          </div>
        )}
        className="h-96"
      />
    )
  }
}
