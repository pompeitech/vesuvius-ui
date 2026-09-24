---
"@pompeitech/vesuvius-ui": minor
---

Add the `TimePicker` organism — a segmented hour/minute/(optional) second/period input, built on
`TimePickerInput`. Supports 12- and 24-hour formats, full keyboard control (arrow keys to
step/switch AM/PM, digit typing with auto-advance between segments, left/right arrow navigation
between segments), and a disabled state across every segment.

This reuses the pure conversion/formatting helpers in `time-picker.utils.ts` that
`DateTimePicker` and `DateTimeRangePicker` already shipped internally in `0.14.0` — no new
dependencies. Ships with full unit test coverage and a Storybook story, same as every other
component in the kit.
