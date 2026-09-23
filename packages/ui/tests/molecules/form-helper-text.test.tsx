import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { FormHelperText } from '@ui/molecules/form-helper-text'

describe('form helper text', () => {
  test('renders helper content', () => {
    render(<FormHelperText>Enter a valid email</FormHelperText>)
    expect(screen.getByText('Enter a valid email')).toBeVisible()
  })
})
