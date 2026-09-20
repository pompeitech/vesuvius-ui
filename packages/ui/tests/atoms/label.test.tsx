import { render, screen } from '@testing-library/react'
import { Label } from '@ui/atoms/label/label'
import { describe, expect, test } from 'vitest'

describe('Label', () => {
  test('associates its text with a form control', () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>
    )
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })
})
