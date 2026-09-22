import { render, screen } from '@testing-library/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@ui/molecules/breadcrumb'
import { describe, expect, test } from 'vitest'

describe('breadcrumb', () => {
  test('renders links and current page', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
    expect(screen.getByRole('link', { name: 'Home' })).toBeVisible()
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page')
  })
})
