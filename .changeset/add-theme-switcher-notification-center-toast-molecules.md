---
"@pompeitech/vesuvius-ui": minor
---

Add three more molecules: `ThemeSwitcher`/`ThemePalettePicker`/`ThemeModeToggle` (composes
`DropdownMenu`, `Popover`, and `Command`, all shipped in earlier batches — this one was blocked
until they landed), `NotificationCenter` (built on `Popover`), and `Toast` (built on `sonner`).
Each ships with full unit test coverage and a Storybook story, same as every other component in
the kit. Together with `Sidebar` (shipped last batch), this rounds out the app-shell trio: nav +
theme switching + notifications/feedback.
