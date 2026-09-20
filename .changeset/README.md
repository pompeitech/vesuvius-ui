# Changesets

This directory is managed by [Changesets](https://github.com/changesets/changesets), which drives
`@pompeitech/vesuvius-ui`'s versioning, `CHANGELOG.md` and npm publishing.

**When you land a change that should ship in the next release**, run:

```bash
pnpm changeset
```

Pick a bump type (`patch` / `minor` / `major`), write a one-line summary of what changed — this
becomes the changelog entry — and commit the generated `.changeset/*.md` file alongside your
change.

Everything else (bumping `package.json`, writing `CHANGELOG.md`, publishing to npm) happens via the
`Release` GitHub Actions workflow — see the root README's "Releases & versioning" section.

Read the [full documentation](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)
for more information on what a changeset is, why it's a good idea, and more.
