## What & why

<!-- What does this change, and why — link an issue if there is one. -->

## Checklist

- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` all pass locally
- [ ] New/changed component has a unit test (`packages/ui/tests/<tier>/...`)
- [ ] New/changed component has a Storybook story covering its variants/states
- [ ] A story or test only imports from an already-released tier (see [Status & roadmap](../README.md#status--roadmap))
- [ ] Added a changeset (`pnpm changeset`) if this affects what gets published — n/a for docs/CI/tooling-only changes
