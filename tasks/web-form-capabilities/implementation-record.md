# Implementation Record

## Status

Implemented and verified for `PuNumberInput`, `PuSelect`, Slice 3, Slice 5,
Slice 6, and root-level `customClass` / `customStyle` cleanup.

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
- Added a shared internal attrs split helper for form controls: `class` and
  `style` stay on the component root, while other attrs fall through to the
  native control.
- Removed explicit `id`, `name`, and `autocomplete` style prop forwarding from
  text, number, textarea, and select controls where native attrs can carry that
  contract.
- Added `PuInput` native `list` / datalist story guidance for free-text
  suggestions.
- Added committed `change(value, event)` events to `PuInput` and `PuTextarea`.
- Kept `PuTextarea` resize policy unchanged: vertical by default, disabled
  while `autoHeight` is active, and native `rows` passes through.
- Documented `PuForm` native form attrs, default submit prevention, native
  `SubmitEvent`, and external submit button support through `form="<id>"`.
- Removed UniApp-style root `customClass` / `customStyle` props from web
  components and the shared `baseProps` helper. Standard Vue `class` / `style`
  fallthrough remains the web root styling path.

## Touched Files

- `packages/web/src/components/puNumberInput/puNumberInput.ts`
- `packages/web/src/components/puNumberInput/puNumberInput.vue`
- `packages/web/src/components/puNumberInput/puNumberInput.scss`
- `packages/web/src/components/_utils/nativeAttrs.ts`
- `packages/web/src/components/puInput/puInput.ts`
- `packages/web/src/components/puInput/puInput.vue`
- `packages/web/src/components/puSelect/puSelect.ts`
- `packages/web/src/components/puSelect/puSelect.vue`
- `packages/web/src/components/puSelect/puSelect.scss`
- `packages/web/src/components/puTextarea/puTextarea.ts`
- `packages/web/src/components/puTextarea/puTextarea.vue`
- `packages/web/src/components/puAccordion/puAccordion.ts`
- `packages/web/src/components/puAccordion/puAccordion.vue`
- `packages/web/src/components/puAccordion/puAccordionItem.ts`
- `packages/web/src/components/puAccordion/puAccordionItem.vue`
- `packages/web/src/components/puCheckbox/puCheckbox.ts`
- `packages/web/src/components/puCheckbox/puCheckbox.vue`
- `packages/web/src/components/puCheckboxGroup/puCheckboxGroup.ts`
- `packages/web/src/components/puCheckboxGroup/puCheckboxGroup.vue`
- `packages/web/src/components/puImgCropper/puImgCropper.ts`
- `packages/web/src/components/puImgCropper/puImgCropper.vue`
- `packages/web/src/components/puPicker/puPicker.ts`
- `packages/web/src/components/puPicker/puPicker.vue`
- `packages/web/src/components/puScrollView/puScrollView.ts`
- `packages/web/src/components/puScrollView/puScrollView.vue`
- `packages/web/src/components/puTab/puTab.ts`
- `packages/web/src/components/puTab/puTab.vue`
- `packages/web/src/components/puTabs/puTabs.ts`
- `packages/web/src/components/puTabs/puTabs.vue`
- `packages/web/src/components/puTag/puTag.ts`
- `packages/web/src/components/puTag/puTag.vue`
- `packages/web/src/utils/props.ts`
- `packages/web/src/stories/forms/PuForm.story.vue`
- `packages/web/src/stories/forms/PuInput.story.vue`
- `packages/web/src/stories/forms/PuNumberInput.story.vue`
- `packages/web/src/stories/forms/PuSelect.story.vue`
- `packages/web/src/stories/forms/PuTextarea.story.vue`
- `packages/web/skill.seed.json`
- `packages/web/src/component-registry.ts`
- `packages/web/types/components.d.ts`
- `packages/web/skills/design-web/references/component-map.md`
- `packages/web/skills/design-web/references/components/PuInput.md`
- `packages/web/skills/design-web/references/components/PuNumberInput.md`
- `packages/web/skills/design-web/references/components/PuSelect.md`
- `packages/web/skills/design-web/references/components/PuForm.md`
- `packages/web/skills/design-web/references/components/PuFormItem.md`
- `packages/web/skills/design-web/references/components/PuTextarea.md`
- `packages/web/skills/design-web/references/usage-rules.md`
- `.changeset/add-number-input-select.md`
- `.changeset/form-native-attrs.md`
- `.changeset/remove-web-root-style-props.md`
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

Passed again after Slice 3 / 5 / 6:

- `pnpm --filter @partner-up-dev/design-web run verify`

Passed again after root style prop cleanup:

- `pnpm --filter @partner-up-dev/design-web run type-check`
- `pnpm --filter @partner-up-dev/design-web run verify`

## Follow-Up Risks

- Locale formatting, clamping, precision, and parser/formatter hooks remain
  deliberately deferred for `PuNumberInput`.
- A custom select or combobox has accessibility and keyboard risk; prefer native
  behavior until custom requirements are explicit.
- `PuForm` forwards native `action` / `method`, but submit prevention remains
  the runtime contract. Treat those attrs as native metadata for form ownership,
  external submit targeting, and browser APIs unless a future slice explicitly
  opts into navigation.
