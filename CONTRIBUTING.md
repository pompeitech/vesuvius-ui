# Contributing to Vesuvius UI

Thanks for taking the time to contribute. This document covers everything you need to get set up,
the conventions the codebase follows, and what a PR needs before it can be merged.

## Getting set up

Requirements: Node `>=24`, [pnpm](https://pnpm.io/) `10.33.0` (pinned via `packageManager` in
`package.json` — `corepack enable` will pick it up automatically).

```bash
git clone https://github.com/pompeitech/vesuvius-ui.git
cd vesuvius-ui
pnpm install
pnpm storybook   # http://localhost:5002, HMR straight from source
```

See the [README](./README.md#development) for the full command list (`test`, `typecheck`, `lint`,
`build`).

## Project structure

This repo follows atomic design, enforced by directory: `packages/ui/src/{atoms,molecules,organisms}`.
If you're unsure which tier something belongs in — does it compose other components (molecule), does
it carry non-trivial internal state or orchestration (organism), or is it a primitive with no
dependency on other components in the kit (atom) — open a discussion before writing code; it's a lot
cheaper to agree on that up front than to move a component later.

**Only atoms are released in `0.1.0`.** Molecules and organisms exist in the tree but are
deliberately not wired into `src/index.ts`, `tsup.config.ts`'s build entries, or the package's
`exports` map yet — see the comments at the top of each of those files for exactly how a tier gets
re-enabled when its release comes around. If you're working on a molecule or organism, your PR
doesn't need to wire it in; that happens as part of cutting that tier's release.

## What a new (or changed) component needs

Every component in this kit ships with three things — a PR adding or changing one is expected to
touch all three that apply:

1. **The component itself** — built on the matching Radix UI primitive where one exists, styled
   with Tailwind CSS v4 utility classes (no inline styles, no CSS modules), typed strictly (no
   `any`), forwarding `ref` and spreading `...props` the way sibling components in the same tier do.
2. **A unit test** in `packages/ui/tests/<tier>/<component>.test.tsx` — React Testing Library,
   asserting on real rendered output (roles, `aria-*` attributes, `data-slot`), not shallow
   rendering or snapshots.
3. **A Storybook story** colocated at `packages/ui/src/<tier>/<component>/<component>.stories.tsx`
   — cover the default state plus every variant/size/state prop actually exposes.

A story or test file must only import from its own tier or a tier that's already released — see
[Status & roadmap](./README.md#status--roadmap). An atom's story importing a molecule breaks the
atoms-only build the moment that molecule isn't checked out (this bit us once already — see git
history around the `fix: remove molecule dependency from Avatar's Storybook story` commit).

## Commit messages

This repo follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short summary, imperative mood, no trailing period>

<optional body — the *why*, not a restatement of the diff>
```

Common types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `ci`. A commit template is
provided — enable it once per clone:

```bash
git config commit.template .gitmessage
```

## Changesets — every user-facing change needs one

If your change affects what gets published to npm (a new component, a prop change, a bug fix in
shipped code — anything that isn't purely internal tooling/docs), add a changeset:

```bash
pnpm changeset
```

Pick the bump type (`patch` for fixes, `minor` for new components/props, `major` for breaking
changes) and write the summary as you'd want it to read in `CHANGELOG.md` — it's used verbatim.
Commit the generated `.changeset/*.md` file with your change. See
[`.changeset/README.md`](./.changeset/README.md) and the README's
[Releases & versioning](./README.md#releases--versioning) section for how that turns into an actual
release — you don't need to do anything beyond adding the changeset; CI handles versioning,
`CHANGELOG.md`, and publishing.

## Before opening a PR

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

All four run in CI on every PR; a red run blocks merge. Running them locally first is faster than
waiting on CI to tell you.

## Code of conduct

This project follows the [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you're expected
to uphold it.
