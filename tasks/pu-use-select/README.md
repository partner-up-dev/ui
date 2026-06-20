# usePuSelect Task Packet

Date: 2026-06-20

## Scope

Add a UI-agnostic selection composable to `@partner-up-dev/design-web` so
consumers can combine shared selection behavior with arbitrary UI primitives.

## Decisions

- Prefer `usePuSelect` over a `PuCardSelect` component because selection state
  should not be coupled to one visual surface.
- Keep `PuCard` as the low-level content/action/selectable card primitive.
- Support single and multiple selection with the same composable.
- Support group disabled state, disabled value arrays, and custom per-option
  disabled checks.
- Support writable ref models, controlled getter models with callbacks, and
  uncontrolled default values.
- Keep card selection coverage in `PuCard.story.vue` by composing
  `usePuSelect` with `PuCard selectable`.

## Target Files

```text
packages/web/src/composables/usePuSelect.ts
packages/web/src/composables/index.ts
packages/web/src/stories/display/PuCard.story.vue
packages/web/README.md
packages/web/skill.seed.json
.changeset/
```

Generated registry and generated skill references should remain component-only;
no new public component is expected.

## Implementation

Added:

```text
packages/web/src/composables/usePuSelect.ts
.changeset/neat-use-select.md
```

Updated:

```text
packages/web/src/composables/index.ts
packages/web/src/stories/display/PuCard.story.vue
packages/web/README.md
packages/web/skill.seed.json
packages/web/skills/design-web/references/components/PuCard.md
packages/web/skills/design-web/references/usage-rules.md
```

`usePuSelect` exposes:

- `modelValue` and `selectedValues` computed state
- `isSelected(value)` and `isDisabled(value)` option helpers
- `select`, `deselect`, `toggle`, `clear`, and `setValue` actions
- `getOptionState(value)` for UI adapters that want a compact option state
- writable ref model updates, controlled callback updates, and uncontrolled
  internal updates
- group disabled state, disabled value lists, and custom option disabled checks

## Verification

```text
pnpm --filter @partner-up-dev/design-web run type-check
pnpm --filter @partner-up-dev/design-web run verify
```

Result:

- Passed generated registry freshness checks.
- Passed generated skill freshness checks.
- Passed `vue-tsc`.
- Passed `intent validate`.
- Passed package build and packed consumer type check.
- Passed story coverage with `49/49` public components covered.
- Passed Histoire build with `41` stories and `205` variants built.
