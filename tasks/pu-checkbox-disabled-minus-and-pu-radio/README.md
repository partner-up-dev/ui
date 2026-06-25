# PuCheckbox Disabled Minus And PuRadio

## State

Complete.

## Request

Update the web selection primitives so `PuCheckbox` shows a visible disabled-off
state instead of an empty center, and add a new `PuRadio` primitive with square
shell and square selected indicator.

## Decisions

- Keep `PuCheckbox` as a boolean native-checkbox primitive. Do not add radio
  semantics or value-based exclusive selection behavior to its API.
- Change only the visual disabled-off checkbox state: use
  `--sys-color-surface-container` as the box background and show
  `i-mdi-minus`, while preserving disabled opacity on the whole control.
- Add `PuRadio` as a separate public primitive with native `type="radio"`
  semantics, application-owned grouping via shared `name + modelValue + value`,
  and the shared `PuSize` / `PuTone` vocabularies.
- Keep `PuRadio` square-cornered to match the package visual foundation; the
  selected indicator is a centered square rather than a checkmark.

## Target Files

- `packages/web/src/components/puCheckbox/puCheckbox.vue`
- `packages/web/src/components/puCheckbox/puCheckbox.scss`
- `packages/web/src/components/puRadio/puRadio.vue`
- `packages/web/src/components/puRadio/puRadio.ts`
- `packages/web/src/components/puRadio/puRadio.scss`
- `packages/web/src/stories/forms/PuCheckbox.story.vue`
- `packages/web/src/stories/forms/PuRadio.story.vue`
- `packages/web/src/styles/unocss-preset.ts`
- `packages/web/skill.seed.json`
- `packages/web/histoire.config.ts`
- `packages/web/docs/shape-audit.md`
- generated component registry, global component types, and design-web skill references
- changeset metadata

## Verification

Passed:

- `pnpm --filter @partner-up-dev/design-web run generate`
- `pnpm --filter @partner-up-dev/design-web run skill:generate`
- `pnpm --filter @partner-up-dev/design-web run type-check`
- `pnpm --filter @partner-up-dev/design-web run verify`
