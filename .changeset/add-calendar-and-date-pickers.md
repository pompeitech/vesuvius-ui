---
"@pompeitech/vesuvius-ui": minor
---

Add five more organisms: `Calendar` (built on `react-day-picker`), and four date pickers that
compose it — `DatePicker`, `DateRangePicker`, `DateTimePicker`, and `DateTimeRangePicker` (using
`date-fns` for formatting). `DateRangePicker` and `DateTimeRangePicker` require a full `from`/`to`
range before their Apply button enables; `DateTimePicker` and `DateTimeRangePicker` add hour/minute
(and optional seconds) columns alongside the calendar, in 12- or 24-hour format.

All five ship with full unit test coverage and a Storybook story, same as every other component in
the kit.
