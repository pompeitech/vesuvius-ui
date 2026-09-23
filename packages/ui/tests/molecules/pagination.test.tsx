import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from '@ui/molecules/pagination'

describe('pagination', () => {
  test('renders navigable page links', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute('href', '#')
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('aria-current', 'page')
  })
})
