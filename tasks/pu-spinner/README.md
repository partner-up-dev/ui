# PuSpinner Task Packet

Date: 2026-06-08

## Scope

Add `PuSpinner` to `@partner-up-dev/design-web` as a public loading indicator
primitive.

## Decisions

- Keep the first public API to `size` and `label`.
- Do not add `tone`; spinner color inherits from `currentColor`.
- Do not add `decorative`; absence of `label` makes the spinner visual-only.
- Document that consumers can color the spinner through a class or parent
  `color`.

## Target Files

```text
packages/web/src/components/puSpinner/
packages/web/src/stories/display/PuSpinner.story.vue
packages/web/skill.seed.json
```

Generated files are expected to change after registry and skill generation.

## Implementation

Added:

```text
packages/web/src/components/puSpinner/puSpinner.ts
packages/web/src/components/puSpinner/puSpinner.vue
packages/web/src/components/puSpinner/puSpinner.scss
packages/web/src/stories/display/PuSpinner.story.vue
```

Updated:

```text
packages/web/skill.seed.json
packages/web/scripts/generate-agent-skill.mjs
packages/web/scripts/check-story-coverage.mjs
```

Generated registry, global component types, and skill references were refreshed.

## Verification

```text
pnpm --filter @partner-up-dev/design-web run type-check
pnpm --filter @partner-up-dev/design-web run story:coverage
pnpm --filter @partner-up-dev/design-web run build
pnpm --filter @partner-up-dev/design-web run story:build
```

Results:

- `type-check` passed.
- `story:coverage` passed with `PuSpinner` covered; existing backlog remains
  `PuScrollView`.
- `build` passed.
- `story:build` passed; existing Histoire warning remains for missing `layout`
  group configuration.
