import { render } from '@testing-library/react'
import { Button } from '@ui/atoms/button/button'
import { IconButton } from '@ui/atoms/icon-button/icon-button'
import { Input } from '@ui/atoms/input/input'
import { NumberInput } from '@ui/atoms/number-input/number-input'
import { CONTROL_SIZES, type ControlSize, controlHeightClassNames } from '@ui/lib/control-size'
import { Select, SelectTrigger, SelectValue } from '@ui/molecules/select/select'
import { Toggle } from '@ui/molecules/toggle'
import { MultiSelect } from '@ui/organisms/multi-select/multi-select'
import { describe, expect, test } from 'vitest'

function Controls({ size }: { size: ControlSize }) {
  return (
    <>
      <Button size={size}>Button</Button>
      <Input size={size} aria-label="Text input" />
      <NumberInput size={size} aria-label="Number input" />
      <Toggle size={size} aria-label="Toggle">
        T
      </Toggle>
      <Select>
        <SelectTrigger size={size} aria-label="Select">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
      </Select>
      <MultiSelect size={size} options={[]} aria-label="Multi-select" />
    </>
  )
}

// The single horizontal-padding scale every text-content control (Button,
// Input, Select, Combobox, MultiSelect, PeopleSelect) shares — see
// lib/control-size.ts's height contract for the vertical half of this.
const controlPaddingClassNames = {
  xs: 'px-2.5',
  sm: 'px-3',
  default: 'px-3',
  lg: 'px-3.5'
} satisfies Record<ControlSize, string>

describe('control sizes', () => {
  test.each(CONTROL_SIZES)(
    '%s gives Button, Input, NumberInput, Toggle, Select, and MultiSelect the same height',
    size => {
      const { container } = render(<Controls size={size} />)
      const controls = container.querySelectorAll(`[data-size="${size}"]`)

      expect(controls).toHaveLength(6)
      controls.forEach(control => {
        expect(control).toHaveClass(controlHeightClassNames[size])
      })
    }
  )

  test.each(CONTROL_SIZES)('%s gives Button the same horizontal padding as Input', size => {
    const { container } = render(
      <>
        <Button size={size}>Button</Button>
        <Input size={size} aria-label="Text input" />
      </>
    )
    const controls = container.querySelectorAll(`[data-size="${size}"]`)

    expect(controls).toHaveLength(2)
    controls.forEach(control => {
      expect(control).toHaveClass(controlPaddingClassNames[size])
    })
  })

  test.each(CONTROL_SIZES)('%s gives IconButton the matching square size', size => {
    const { container } = render(<IconButton size={size} aria-label="Icon button" />)
    const iconButton = container.querySelector(`[data-size="${size}"]`)
    // Square icon controls: the height token doubles as the width token.
    expect(iconButton).toHaveClass(controlHeightClassNames[size].replace('h-', 'size-'))
  })
})
