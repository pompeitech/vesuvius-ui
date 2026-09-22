---
"@pompeitech/vesuvius-ui": patch
---

Fix size alignment across single-line form controls, so every control of
the same size shares the exact same height and horizontal padding:

- `Button`'s `default`/`lg` sizes now use the same horizontal padding as
  `Input`/`Select`/`Combobox`/`MultiSelect`/`PeopleSelect` (previously
  wider at those two sizes only — `xs`/`sm` already matched).
- `IconButton` gains a `size` prop (`xs`/`sm`/`default`/`lg`), matching
  `Button`'s `icon-*` sizes and every other control's height scale.
  Previously fixed at a single `size-9`.
- `NumberInput` gains a `size` prop. Previously fixed at `h-9` regardless
  of what size the controls around it used.
- `PasswordInput`'s show/hide toggle button now scales with the input's
  own `size` instead of a hardcoded `size-7`. Also fixes a pre-existing
  type error in `PasswordInputProps` (the native HTML `size` attribute
  wasn't omitted before merging with the custom `size` prop, so passing
  a `ControlSize` string literal didn't type-check).
- `Toggle`/`ToggleGroup` now use the shared height/padding scale (was a
  separate, narrower scale with no `xs` size).
