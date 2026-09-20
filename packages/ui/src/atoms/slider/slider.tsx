import * as SliderPrimitive from '@radix-ui/react-slider'
import { type ComponentProps, type ComponentRef, forwardRef, useMemo } from 'react'
import { cn } from '../../lib/utils'

export type SliderProps = ComponentProps<typeof SliderPrimitive.Root>

// aria-label applies per-thumb (Radix's Thumb doesn't inherit it from Root);
// suffixed with an index when there's more than one thumb.
export const Slider = forwardRef<ComponentRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    {
      className,
      defaultValue,
      value,
      min = 0,
      max = 100,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    const values = useMemo(
      () =>
        Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
      [value, defaultValue, min, max]
    )

    return (
      <SliderPrimitive.Root
        ref={ref}
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        className={cn(
          'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          />
        </SliderPrimitive.Track>
        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            aria-label={
              ariaLabel ? (values.length > 1 ? `${ariaLabel} ${index + 1}` : ariaLabel) : undefined
            }
            aria-labelledby={ariaLabel ? undefined : ariaLabelledBy}
            className="border-primary bg-background hover:ring-ring/50 focus-visible:ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] outline-none hover:ring-4 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
    )
  }
)
Slider.displayName = 'Slider'
