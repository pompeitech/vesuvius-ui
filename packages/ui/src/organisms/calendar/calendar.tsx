import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useMemo } from 'react'
import { DayPicker, type DayPickerProps, getDefaultClassNames } from 'react-day-picker'
import { buttonVariants } from '../../atoms/button/button.variants'
import { cn } from '../../lib/utils'

export type CalendarProps = DayPickerProps & {
  buttonVariant?: 'ghost' | 'outline'
}

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = useMemo(() => getDefaultClassNames(), [])

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn(
        'bg-background group/calendar p-2 [--cell-size:1.75rem]',
        '[[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        className
      )}
      formatters={{
        formatMonthDropdown: date => date.toLocaleString('default', { month: 'short' }),
        ...formatters
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('flex gap-3 flex-col md:flex-row relative', defaultClassNames.months),
        month: cn('flex flex-col w-full gap-3', defaultClassNames.month),
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'w-full flex items-center text-sm font-medium justify-center gap-1.5',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'relative rounded-md has-focus:ring-[3px] has-focus:ring-ring/50',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn('absolute inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none font-semibold',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-base h-8 [&>svg]:text-muted-foreground [&>svg]:size-4',
          defaultClassNames.caption_label
        ),
        month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none',
          defaultClassNames.weekday
        ),
        week: cn('flex w-full mt-1', defaultClassNames.week),
        week_number_header: cn('select-none w-(--cell-size)', defaultClassNames.week_number_header),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground',
          defaultClassNames.week_number
        ),
        day: cn(
          'relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none',
          defaultClassNames.day
        ),
        range_start: cn('rounded-l-md bg-accent', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
        today: cn(
          'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
          defaultClassNames.today
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside
        ),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames
      }}
      components={{
        Chevron: ({ className: chevronClassName, orientation }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn('size-4', chevronClassName)} />
          }
          if (orientation === 'right') {
            return <ChevronRightIcon className={cn('size-4', chevronClassName)} />
          }
          return <ChevronDownIcon className={cn('size-4', chevronClassName)} />
        },
        DayButton: ({ className: dayClassName, day, modifiers, ...dayProps }) => (
          <button
            type="button"
            data-day={day.date.toLocaleDateString()}
            data-selected={modifiers.selected}
            data-range-start={modifiers.range_start}
            data-range-end={modifiers.range_end}
            data-range-middle={modifiers.range_middle}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              // buttonVariants' default size ships px-4 py-2 — at this
              // button's actual size (driven by --cell-size, not by its
              // own padding) that alone was bigger than the whole cell.
              'flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 p-0 leading-none font-normal',
              'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground',
              'data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-middle=true]:rounded-none',
              'data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-r-none',
              'data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:rounded-md data-[range-end=true]:rounded-l-none',
              'group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]',
              '[&>span]:text-xs [&>span]:opacity-70',
              dayClassName
            )}
            {...dayProps}
          />
        ),
        ...components
      }}
      {...props}
    />
  )
}
