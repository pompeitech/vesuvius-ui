import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Grid, GridItem } from '@ui/molecules/grid'

describe('grid', () => {
  test('renders grid items', () => {
    render(
      <Grid>
        <GridItem>One</GridItem>
        <GridItem>Two</GridItem>
      </Grid>
    )
    expect(screen.getByText('One')).toBeVisible()
    expect(screen.getByText('Two')).toBeVisible()
  })
})
