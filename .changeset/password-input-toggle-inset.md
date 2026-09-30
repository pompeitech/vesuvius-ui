---
"@pompeitech/vesuvius-ui": patch
---

Fix `PasswordInput`'s show/hide toggle covering the input's right border. The toggle is now one size step smaller than the input (`size-5`/`6`/`7`/`8` for `xs`/`sm`/`default`/`lg`), with a transparent background and muted icon color, so it sits inside the border at every size.
