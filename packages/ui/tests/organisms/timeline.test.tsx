import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Timeline } from '@ui/organisms/timeline/timeline'
import { describe, expect, test, vi } from 'vitest'

describe('Timeline', () => {
  test('renders a list item per entry with title, date, and description', () => {
    const { container } = render(
      <Timeline
        items={[
          { id: 'one', title: 'Started', date: 'Today', description: 'Work started.' },
          { id: 'two', title: 'Completed', status: 'success', description: 'All done.' }
        ]}
      />
    )
    expect(screen.getByText('Started')).toBeVisible()
    expect(screen.getByText('Completed')).toBeVisible()
    expect(screen.getByText('Today').tagName).toBe('TIME')
    expect(container.querySelectorAll('li[data-slot="timeline-item"]')).toHaveLength(2)
  })

  test('applies a default accessible label and marks the status on each item', () => {
    render(<Timeline items={[{ id: 'one', title: 'Deployed', status: 'destructive' }]} />)
    expect(screen.getByRole('list', { name: 'Timeline' })).toBeVisible()
    expect(document.querySelector('[data-status="destructive"]')).not.toBeNull()
  })

  test('roadmap variant renders period labels and marks its own data-variant', () => {
    render(
      <Timeline
        variant="roadmap"
        items={[{ id: 'q1', date: 'Q1', title: 'Foundations', status: 'success' }]}
      />
    )
    expect(screen.getByRole('list', { name: 'Timeline' })).toHaveAttribute(
      'data-variant',
      'roadmap'
    )
    expect(screen.getByText('Q1')).toBeVisible()
  })

  test('renders an interactive item as a button and forwards its click', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Timeline items={[{ id: 'q2', title: 'Admin Kit', onClick }]} />)
    await user.click(screen.getByRole('button', { name: 'Admin Kit' }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
