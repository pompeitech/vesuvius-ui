---
'@pompeitech/vesuvius-ui': minor
---

Date pickers: add `locale` and `weekStartsOn` to `Calendar`, `DatePicker`, `DateRangePicker`, `DateTimePicker` and `DateTimeRangePicker`, plus a `DateLocaleProvider` to set them app-wide (props win over the provider). The locale now drives the trigger text and the month dropdown too. `DateTimePicker` gains `confirmLabel`/`cancelLabel`, `DateTimeRangePicker` gains `startTimeLabel`/`endTimeLabel`. Defaults are unchanged (English, Sunday first).
