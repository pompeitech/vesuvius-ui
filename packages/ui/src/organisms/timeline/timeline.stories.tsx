import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckIcon, RocketIcon, SparklesIcon } from 'lucide-react'
import { Timeline } from './timeline'

const meta = {
  title: 'Organisms/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Project timeline',
    items: []
  }
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

export const Roadmap: Story = {
  render: () => (
    <div className="max-w-3xl rounded-2xl border bg-background p-6">
      <Timeline
        variant="roadmap"
        items={[
          {
            id: 'foundations',
            date: 'Q1',
            title: 'Foundations',
            description: 'Design tokens, accessibility and the first component primitives.',
            status: 'success',
            icon: <CheckIcon className="size-3.5" />
          },
          {
            id: 'compositions',
            date: 'Q2',
            title: 'Compositions',
            description: 'Tables, navigation patterns and dashboard-ready organisms.',
            status: 'active',
            icon: <SparklesIcon className="size-3.5" />
          },
          {
            id: 'admin-kit',
            date: 'Q3',
            title: 'Admin Kit',
            description: 'A complete product shell assembled with Vesuvius UI.',
            status: 'default',
            icon: <RocketIcon className="size-3.5" />
          }
        ]}
      />
    </div>
  )
}

export const Activity: Story = {
  args: {
    items: [
      {
        id: 'one',
        title: 'Project created',
        date: '10:42',
        description: 'Workspace initialized.',
        status: 'success'
      },
      {
        id: 'two',
        title: 'Review requested',
        date: 'Yesterday',
        description: 'Waiting for feedback.',
        status: 'active'
      },
      { id: 'three', title: 'Deployment scheduled', date: 'Tomorrow', status: 'muted' }
    ]
  }
}
