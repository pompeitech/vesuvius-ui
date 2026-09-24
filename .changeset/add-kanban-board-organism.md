---
"@pompeitech/vesuvius-ui": minor
---

Add the `KanbanBoard` organism — drag cards between columns, built on `@dnd-kit/core`. Shows a
live drop placeholder at the target position while dragging and a `DragOverlay` for the card being
moved; columns render their own count badge and an empty state when they have no cards.

New dependency: `@dnd-kit/core`. Ships with unit test coverage and a Storybook story, same as
every other component in the kit.
