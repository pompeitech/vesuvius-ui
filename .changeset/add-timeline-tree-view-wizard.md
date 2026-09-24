---
"@pompeitech/vesuvius-ui": minor
---

Add three more organisms: `Timeline` (activity-feed and roadmap variants, with per-item status
colors and optional click handlers), `TreeView` (a keyboard-navigable file-tree pattern with
single/multi-select, expand/collapse, and full arrow-key navigation), and `Wizard` (a multi-step
flow built on `Stepper`, with per-step async `validate()` gating advancement and step-click
navigation limited to already-visited steps).

All three compose only already-shipped molecules/atoms — no new dependencies. Ship with full unit
test coverage and a Storybook story, same as every other component in the kit.
