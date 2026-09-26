import {
  ABSENCE_TYPE_CELL_CLASS,
  ABSENCE_TYPE_ICON,
  ABSENCE_TYPE_LABEL,
  ABSENCE_TYPE_OPTIONS
} from '../../_shared/format'

/** What each cell icon/color on the calendar means. */
export function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      {ABSENCE_TYPE_OPTIONS.map(option => {
        const Icon = ABSENCE_TYPE_ICON[option.value]
        return (
          <span key={option.value} className="flex items-center gap-1.5">
            <span
              className={`flex size-5 items-center justify-center rounded ${ABSENCE_TYPE_CELL_CLASS[option.value]}`}
            >
              <Icon className="size-3.5" />
            </span>
            {ABSENCE_TYPE_LABEL[option.value]}
          </span>
        )
      })}
    </div>
  )
}
