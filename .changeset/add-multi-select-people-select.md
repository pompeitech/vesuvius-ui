---
"@pompeitech/vesuvius-ui": minor
---

Add two more organisms: `MultiSelect` (a `Command`/`Popover` combobox with removable chips per
selected value and overflow collapsing into a "+N more" badge) and `PeopleSelect` (the same
combobox pattern for a single value, pairing each option with `UserAvatar` and an optional
"Unassigned" clear option).

Both compose only already-shipped molecules/atoms — no new dependencies. Ship with full unit test
coverage and a Storybook story, same as every other component in the kit.
