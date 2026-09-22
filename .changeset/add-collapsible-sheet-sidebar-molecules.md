---
"@pompeitech/vesuvius-ui": minor
---

Add three more molecules: `Collapsible` (built on `@radix-ui/react-collapsible`), `Sheet` (built on
`@radix-ui/react-dialog`), and `Sidebar` (composes `Collapsible`, `Sheet`, `DropdownMenu`, and
`Tooltip` into a full app-shell navigation sidebar with a `SidebarProvider`/`SidebarNav`). Each
ships with full unit test coverage and a Storybook story, same as every other component in the
kit. Shipped together since Sidebar depends on both Collapsible and Sheet.
