import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Header, HeaderEnd, HeaderStart } from '@ui/molecules/header'

describe('header', () => {
  test('renders start and end slots', () => {
    render(
      <Header>
        <HeaderStart>Brand</HeaderStart>
        <HeaderEnd>Actions</HeaderEnd>
      </Header>
    )
    expect(screen.getByText('Brand')).toBeVisible()
    expect(screen.getByText('Actions')).toBeVisible()
  })
})
