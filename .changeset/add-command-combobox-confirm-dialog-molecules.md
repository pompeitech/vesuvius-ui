---
"@pompeitech/vesuvius-ui": minor
---

Add three more molecules: `Command` (built on `cmdk`), `Combobox` (built on top of `Command` and
`Popover`), and `ConfirmDialog` (built on top of `AlertDialog`). Each ships with full unit test
coverage and a Storybook story, same as every other component in the kit. Command and Combobox
ship together since Combobox composes Command; ConfirmDialog was already fully test-and-story
ready, just waiting on AlertDialog to ship first.
