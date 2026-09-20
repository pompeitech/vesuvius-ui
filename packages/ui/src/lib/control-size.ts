export const CONTROL_SIZES = ['xs', 'sm', 'default', 'lg'] as const

export type ControlSize = (typeof CONTROL_SIZES)[number]

/** Shared height contract for every single-line form control. */
export const controlHeightClassNames = {
  xs: 'h-7',
  sm: 'h-8',
  default: 'h-9',
  lg: 'h-10'
} satisfies Record<ControlSize, string>
