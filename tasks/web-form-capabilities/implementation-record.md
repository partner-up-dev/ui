# Implementation Record

## Status

Implemented and verified for the first `PuNumberInput` and `PuSelect` slice.

## Implemented Decisions

- Added `PuNumberInput` as the dedicated `number | null` field component.
- Added `PuSelect` as a general web-native single-selection component.
- Kept `PuInput nativeType="number"` string-backed and documented
  `PuNumberInput` as the preferred numeric app-state path.
- Did not add a `density` prop; both new components reuse `size`.
- Did not add `PuFormItem` a11y context in this slice. Undeclared attributes
  are split so `class` / `style` apply to the component root and other attrs,
  including `aria-*`, pass through to the native control.
- Added a focused changeset because public package API and runtime behavior
  changed.

## Touched Files

- `packages/web/src/components/puNumberInput/puNumberInput.ts`
- `packages/web/src/components/puNumberInput/puNumberInput.vue`
- `packages/web/src/components/puNumberInput/puNumberInput.scss`
- `packages/web/src/components/puSelect/puSelect.ts`
- `packages/web/src/components/puSelect/puSelect.vue`
- `packages/web/src/components/puSelect/puSelect.scss`
- `packages/web/src/stories/forms/PuNumberInput.story.vue`
- `packages/web/src/stories/forms/PuSelect.story.vue`
- `packages/web/skill.seed.json`
- `packages/web/src/component-registry.ts`
- `packages/web/types/components.d.ts`
- `packages/web/skills/design-web/references/component-map.md`
- `packages/web/skills/design-web/references/components/PuInput.md`
- `packages/web/skills/design-web/references/components/PuNumberInput.md`
- `packages/web/skills/design-web/references/components/PuSelect.md`
- `packages/web/skills/design-web/references/usage-rules.md`
- `.changeset/add-number-input-select.md`
- `tasks/web-form-capabilities/README.md`
- `tasks/web-form-capabilities/capability-inventory.md`
- `tasks/web-form-capabilities/implementation-plan.md`
- `tasks/web-form-capabilities/api-design.md`
- `tasks/web-form-capabilities/verification-matrix.md`
- `tasks/web-form-capabilities/implementation-record.md`

## Verification

Passed:

- `pnpm --filter @partner-up-dev/design-web run generate`
- `pnpm --filter @partner-up-dev/design-web run skill:generate`
- `pnpm --filter @partner-up-dev/design-web run type-check`
- `pnpm --filter @partner-up-dev/design-web run build`
- `pnpm --filter @partner-up-dev/design-web run check:packed-types`
- `pnpm --filter @partner-up-dev/design-web run story:coverage`
- `pnpm --filter @partner-up-dev/design-web run story:build`
- `pnpm --filter @partner-up-dev/design-web run verify`

## Follow-Up Risks

- Locale formatting, clamping, precision, and parser/formatter hooks remain
  deliberately deferred for `PuNumberInput`.
- A custom select or combobox has accessibility and keyboard risk; prefer native
  behavior until custom requirements are explicit.
- `PuForm` currently prevents default submit; any `action` / `method` support
  must clarify whether those attributes are descriptive or behavior-changing.
