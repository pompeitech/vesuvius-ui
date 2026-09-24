---
"@pompeitech/vesuvius-ui": minor
---

Add the `RichTextEditor` and `RichTextViewer` organisms. `RichTextEditor` is built on
Tiptap/ProseMirror with a formatting toolbar (bold, italic, strikethrough, a level-2 heading,
bullet/numbered lists, blockquotes, undo/redo) and a placeholder for empty content; external
`value` updates are synced into the editor without fighting the user's own typing. `RichTextViewer`
renders the editor's saved HTML read-only, sharing the same content styles.

New dependencies: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-placeholder`. Ship
with unit test coverage and a Storybook story, same as every other component in the kit.
