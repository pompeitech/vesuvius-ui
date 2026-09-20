import { render, screen } from '@testing-library/react'
import { AspectRatio } from '@ui/atoms/aspect-ratio/aspect-ratio'
import { describe, expect, test } from 'vitest'

describe('AspectRatio', () => {
  test('reserves the requested ratio for its content', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <img src="/preview.png" alt="Preview" />
      </AspectRatio>
    )
    expect(screen.getByRole('img', { name: 'Preview' }).parentElement).toHaveStyle({
      position: 'absolute'
    })
  })
})
