---
"@pompeitech/vesuvius-ui": minor
---

Add three more molecules: `Dialog` (built on `@radix-ui/react-dialog`), `DropdownMenu` (built on
`@radix-ui/react-dropdown-menu`), and `AlertDialog` (built on `@radix-ui/react-alert-dialog`). Each
ships with full unit test coverage and a Storybook story, same as every other component in the
kit. These three unblock several other molecules already on disk that build on top of them
(Command, Combobox, Sidebar, ThemeSwitcher, ConfirmDialog), which will follow in later batches.
