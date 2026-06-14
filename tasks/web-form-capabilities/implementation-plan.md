# Implementation Plan

## Goal

Make `packages/web` form components capable enough for dense downstream admin
and editor forms without sacrificing native web semantics or type clarity.

## Target State

- Numeric form fields can bind directly to `number | null` state.
- Native numeric/date/time constraints are typed and forwarded.
- Field labels, errors, helper text, and internal icon controls have an
  explicit accessibility contract.
- `PuForm` has an explicit native form attribute and external submit contract.
- Enum/entity selection has a web-native package component path.
- Free-text suggestions have a documented datalist or autocomplete path.
- Textarea sizing and committed-change guidance are explicit.

## Slice 1: Numeric Contract And Constraints

Preferred decision:

- Keep `PuInput` string-backed.
- Add `PuNumberInput` as the dedicated numeric model component.
- Steer numeric app state to `PuNumberInput` in docs and generated skill
  references. `PuInput nativeType="number"` remains string-backed and should not
  be recommended for `number | null` state.

Required behavior:

- `modelValue: number | null`.
- Empty text maps to `null`.
- Valid numeric text maps to `number`.
- Invalid intermediate text stays visible locally without emitting a misleading
  numeric value.
- `min`, `max`, and `step` are typed and forwarded.
- Stories cover empty, valid, invalid intermediate, min/max/step, disabled,
  readonly, invalid, and `PuFormItem` composition.

Likely files:

- `packages/web/src/components/puNumberInput/`
- `packages/web/src/components/puInput/`
- `packages/web/src/stories/forms/PuNumberInput.story.vue`
- `packages/web/src/stories/forms/PuInput.story.vue`
- `packages/web/skill.seed.json`
- generated registry, global types, and skill references

## Slice 2: Field Accessibility Contract

Required behavior:

- Define how `PuFormItem` message ids connect to field controls through
  `aria-describedby`.
- Define whether `PuFormItem` can provide a field context that controls consume,
  or whether examples require explicit `id`, `forId`, `invalid`, and
  `aria-describedby` props.
- Add accessible labels for built-in `PuInput` clear, password visibility, and
  icon buttons.
- Avoid hidden magic that makes custom controls hard to compose.

Likely files:

- `packages/web/src/components/puFormItem/`
- `packages/web/src/components/puInput/`
- `packages/web/src/components/puTextarea/`
- `packages/web/src/stories/forms/PuForm.story.vue`
- `packages/web/src/stories/forms/PuInput.story.vue`
- `packages/web/skill.seed.json`

## Slice 3: Native Form Contract

Required behavior:

- Add or document public `PuForm` props for `id`, `name`, `autocomplete`,
  `novalidate`, `action`, and `method`.
- State clearly that `PuForm` prevents default native navigation and emits the
  native `SubmitEvent`.
- Show external submit through a button with native `form="<id>"`.
- Keep validation opt-in through `validate()`.
- Keep mutation pending/disabled ownership in the app.

Likely files:

- `packages/web/src/components/puForm/`
- `packages/web/src/stories/forms/PuForm.story.vue`
- `packages/web/skill.seed.json`

## Slice 4: PuSelect API

Preferred decision:

- Add `PuSelect` as a general web-native field, not only an admin-dense field.
- Start from native `<select>` semantics unless design requirements force a
  custom listbox.
- Reuse `size`; do not add `density` in the first API.

Resolved direction:

- Use `string | number | null` values.
- Use option objects with labels and disabled state.
- Use `placeholder` plus `clearable` for null selection.
- Keep multi-select out of the first API; `PuCheckboxGroup` remains the current
  multi-select path.

Required before implementation:

- Keyboard and focus behavior.
- Screen-reader behavior.
- Option shape and public exported types.
- Story coverage for `PuFormItem` composition and disabled options.

## Slice 5: Datalist / Autocomplete

Preferred staged approach:

- First add typed `list` forwarding to `PuInput` if native datalist is enough.
- Plan `PuAutocomplete` / `PuCombobox` only if consumers need custom option
  rendering, async filtering, labels distinct from submitted values, or richer
  keyboard control.

Non-negotiable behavior:

- Must support free text.
- Must not collapse suggestions into fixed picker selection.

## Slice 6: Textarea Sizing And Change Events

Textarea:

- Add `rows` as the lowest-risk native sizing prop.
- Decide whether `minRows` and `maxRows` are needed with `autoHeight`.
- Document resize policy: native, vertical-only, disabled, or package-owned.

Dirty/change events:

- Document `update:modelValue` as the live dirty hook.
- Add typed `change` events only if committed-value semantics are needed across
  real admin editors.
- Do not reintroduce old UniApp-style `input` compatibility events.

## Deferred Validation And Layout Capabilities

Do not add these in the first implementation unless a concrete downstream slice
needs them:

- field-level rules
- validateField
- resetFields / clearValidate
- dirty / touched metadata
- validation triggers
- form grid / inline-label layout
- input group layout
- radio group

## Open Questions

- Should `PuSelect` first be a styled native `<select>` with limited API?
- Is native `datalist` good enough for current PR type/location suggestions?
- Should `change` be consistent across all text-like controls, or limited to
  number/select controls?
- Should `PuFormItem` provide field accessibility context, or should the public
  contract stay explicit through props/examples?

## Non-Goals

- Do not build a schema-driven form framework.
- Do not make `PuPicker` cover every select and autocomplete interaction.
- Do not move app mutation ownership into `PuForm`.
- Do not touch `packages/uniapp` in the first implementation unless explicitly
  requested.
