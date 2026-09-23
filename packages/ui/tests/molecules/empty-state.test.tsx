import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { EmptyState } from '@ui/molecules/empty-state'

describe('empty state', () => {
  test('renders title and description', () => {
    render(<EmptyState title="No results" description="Try another search" />)
    expect(screen.getByText('No results')).toBeVisible()
    expect(screen.getByText('Try another search')).toBeVisible()
  })
})
