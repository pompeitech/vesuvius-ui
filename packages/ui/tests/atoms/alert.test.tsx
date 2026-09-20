import { render, screen } from '@testing-library/react'
import { Alert, AlertDescription, AlertTitle } from '@ui/atoms/alert/alert'
import { describe, expect, test } from 'vitest'

describe('Alert', () => {
  test('exposes semantic content and slots', () => {
    render(
      <Alert variant="warning">
        <AlertTitle>Maintenance</AlertTitle>
        <AlertDescription>Service will restart shortly.</AlertDescription>
      </Alert>
    )
    expect(screen.getByRole('alert')).toHaveAttribute('data-slot', 'alert')
    expect(screen.getByText('Maintenance')).toHaveAttribute('data-slot', 'alert-title')
    expect(screen.getByText(/Service will restart/)).toHaveAttribute(
      'data-slot',
      'alert-description'
    )
  })
})
