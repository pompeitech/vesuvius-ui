---
"@pompeitech/vesuvius-ui": minor
---

Add five more molecules: `FilePreview`, `FileUploader`, `FilterBar`, `FormHelperText`, and
`Stepper` — each self-contained, no dependency on any other not-yet-shipped molecule, and no new
runtime dependencies. Each ships with full unit test coverage and a Storybook story, same as every
other component in the kit. This clears the entire backlog of molecules that were ready without
needing new dependencies — the remaining ones (`ContextMenu`, `NavigationMenu`, `ChartCard`,
`StatCard`) need either new Radix packages or an unshipped organism first.
