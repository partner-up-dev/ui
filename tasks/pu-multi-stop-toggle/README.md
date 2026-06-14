# PuMultiStopToggle Task Packet

Date: 2026-06-14

## Scope

Add `PuMultiStopToggle` to `@partner-up-dev/design-web` as a compact
multi-position selection control migrated from the MVP frontend primitive.

## Decisions

- Keep this as a new component instead of extending `PuToggleSwitch` or
  `PuSegmented`; it has slider-like discrete stops and no visible option labels.
- Preserve the source behavior where click, Enter, and Space advance using a
  bounce direction, while arrow keys move linearly between stops.
- Keep labels in the option model for accessible value text and external label
  composition; the component itself renders only the rail and thumb.
- Treat this release metadata as a patch change per request.
- Do not perform the MVP application回迁 in this task.

## Target Files

```text
packages/web/src/components/puMultiStopToggle/
packages/web/src/stories/forms/PuMultiStopToggle.story.vue
packages/web/skill.seed.json
.changeset/
```

Generated registry, global component types, and skill references are expected
to change after package generation.

## Implementation

Added:

```text
packages/web/src/components/puMultiStopToggle/puMultiStopToggle.ts
packages/web/src/components/puMultiStopToggle/puMultiStopToggle.vue
packages/web/src/components/puMultiStopToggle/puMultiStopToggle.scss
packages/web/src/stories/forms/PuMultiStopToggle.story.vue
.changeset/pu-multi-stop-toggle.md
```

Updated:

```text
packages/web/skill.seed.json
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
packages/web/skills/design-web/references/component-map.md
packages/web/skills/design-web/references/usage-rules.md
packages/web/skills/design-web/references/components/PuMultiStopToggle.md
```

## Verification

```text
pnpm --filter @partner-up-dev/design-web run verify
```

Result:

- Passed `type-check`, including generated registry and skill freshness checks.
- Passed `skill:validate`.
- Passed package `build`.
- Passed packed consumer type check.
- Passed `story:coverage` with `45/45` public components covered.
- Passed `story:build` with `37` stories and `175` variants built.
