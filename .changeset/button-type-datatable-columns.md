---
"@pompeitech/vesuvius-ui": patch
---

`Button` now defaults to `type="button"`, so it no longer submits a surrounding `<form>` unless you pass `type="submit"` (an explicit `type` always wins; it is left untouched with `asChild`). `DataTable`'s `columns` prop now accepts columns built with `createColumnHelper().accessor()`, which previously failed to type-check.
