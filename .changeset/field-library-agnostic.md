---
"@pompeitech/vesuvius-ui": minor
---

Replace the react-hook-form-based `Form` molecule with a library-agnostic `Field` molecule, and drop `react-hook-form`, `@hookform/resolvers` and `zod` from the package's dependencies.

New: `Field`, `FieldLabel`, `FieldControl`, `FieldDescription`, `FieldError`. They wire label, control, description and error message together (`htmlFor`/`id`, `aria-invalid`, `aria-required`, `aria-describedby`) from props, so they work with any form library or plain state. Rendering a non-empty `FieldError` marks the field invalid; `invalid` forces it.

**Breaking:** removed `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`, `useZodForm`, `FieldNumberInput` and `FieldNumberInputProps`. To keep using react-hook-form, render the new components inside a `Controller` and pass `fieldState.error?.message` to `FieldError` — see the Field docs page for the full example.
