# PuChipInput / PuChipsEditor Task Packet

## Status

Complete.

## Request

Design editable chip primitives for `packages/web` and align chip/tag geometry:

- Prefer `PuChipInput` over `PuTagInput` for consistency with the existing
  interactive token primitive.
- Keep `PuTag` as a compact non-interactive status or category label.
- Keep `PuChip` as the single chip/token primitive for selected, removable, or
  clickable tokens.
- Add single-chip editing under `PuChipInput` rather than pushing editable text
  behavior into `PuChip`.
- Add collection-level form behavior under `PuChipsEditor` for string-array
  chip entry, draft input, separators, and native form serialization.
- Make chip and tag defaults rectangular. `PuTag` already defaults to
  `shape="rect"`; `PuChip` needs an explicit shape contract instead of its
  current hard-coded pill radius.

## Current Evidence

- `PuTag` current public props are `text`, `tone`, `variant`, `shape`, and
  `size`; it has no emitted events. Its default shape is already `rect`.
- `PuChip` already owns single-token interaction affordances:
  `selected`, `disabled`, `removable`, `click`, `remove`, prefix/suffix slots,
  and remove-icon slot.
- `PuChip` had no `shape` prop and its root radius was hard-coded to pill
  styling before this task.
- `PuChipGroup` is currently a layout component only. It owns gap, alignment,
  wrapping, and fit-to-width behavior, but it does not own model state.
- `PuInput` is the package's string-backed single-line field control, but a
  chip-shaped input needs token geometry and remove affordance. A collection
  editor additionally needs inline token rendering, deletion, draft composition,
  and collection model updates that are outside plain `PuInput`.

## Design Claims

- `PuChipInput` is the right name for a single editable chip: it keeps chip
  geometry while exposing native input semantics for one string value.
- `PuChipsEditor` is the right name for a field-level string-array editor: it
  owns collection state, pending text, separators, option creation, and keyboard
  behavior for the whole field.
- `PuChip` should not own editable text or draft input. A token primitive should
  not also become a form controller.
- `PuChipsEditor` should compose native input behavior with `PuChipGroup` and
  `PuChip`.
- `PuChipGroup` should stay layout-only until there is stronger pressure for a
  generic controlled selection group.
- `PuTag` and `PuChip` should have compatible shape vocabulary. Default should
  be rectangular, with `shape="pill"` available for rounded token treatments.

## Proposed Component Topology

```text
PuTag
  +-- non-interactive status/category label

PuChip
  +-- single compact token
  +-- selected/removable/clickable visual and event contract

PuChipGroup
  +-- layout for groups of chips
  +-- gap, alignment, wrap, fit-to-width

PuChipInput
  +-- single editable chip
  +-- string model, commit/cancel/remove events

PuChipsEditor
  +-- form field for chip collections
  +-- composes PuChipGroup + PuChip + native input
```

## Proposed PuChip Shape Slice

Add shape to `PuChip` before or alongside `PuChipInput`:

```ts
type PuChipShape = "rect" | "pill";

shape: {
  default: "rect"
}
```

Implementation direction:

- Use shared `PuShape` vocabulary, excluding `circle`.
- Add `pu-chip--shape-rect` and `pu-chip--shape-pill`.
- Remove root hard-coded pill radius.
- Keep remove button internally round enough for icon hit feedback if needed;
  do not let that override root chip geometry.
- Add story variants for default rect and explicit pill.
- Update generated skill references after public API docs change.

## Proposed PuChipInput API Direction

Start narrow and string-backed:

```ts
type PuChipInputValue = string;

modelValue: string
placeholder?: string
disabled?: boolean
readonly?: boolean
invalid?: boolean
size?: "sm" | "md" | "lg"
tone?: PuChipTone
variant?: PuChipVariant
shape?: "rect" | "pill"
removable?: boolean
removeLabel?: string
maxlength?: number
commitOnBlur?: boolean
selectOnFocus?: boolean
prefixIcon?: string
suffixIcon?: string
```

Events:

```ts
"update:modelValue"(value: string)
"change"(value: string, event)
"commit"(value: string, context)
"cancel"(value: string, event)
"remove"(value: string, event)
"focus"(event)
"blur"(event)
"click"(event)
```

Slots:

```text
default editing is the native input
prefix       leading chip adornment
suffix       trailing chip adornment
remove-icon  custom remove icon
```

## Proposed PuChipsEditor API Direction

Start narrow and string-backed:

```ts
type PuChipsEditorValue = string[];

modelValue: string[]
draftValue?: string
placeholder?: string
disabled?: boolean
readonly?: boolean
invalid?: boolean
size?: "sm" | "md" | "lg"
variant?: PuFieldVariant
tone?: PuTone
shape?: "rect" | "pill"
max?: number
allowDuplicates?: boolean
separators?: string[]
addOnBlur?: boolean
clearable?: boolean
removeLabel?: string
```

Events:

```ts
"update:modelValue"(value: string[])
"update:draftValue"(value: string)
"change"(value: string[])
"add"(value: string, context)
"remove"(value: string, index, context)
"clear"(event)
"focus"(event)
"blur"(event)
```

Slots:

```text
chip       custom selected chip renderer
prefix     leading field adornment
suffix     trailing field adornment
empty      optional empty state inside suggestion/list mode, if added later
```

Avoid in the first slice:

- async suggestions
- custom option listbox
- object-valued tags
- validation framework ownership
- app-specific create-confirm UX

## PuChipsEditor Interaction Requirements

Minimum behavior for the first useful component:

- Type into an inline native input.
- Press `Enter` to commit the current draft.
- Commit on configured separators, defaulting to comma.
- Respect IME composition and avoid committing while composition is active.
- Trim values before commit unless a later product case requires preserving
  surrounding whitespace.
- Reject empty values.
- Reject duplicates by default.
- Respect `max`.
- Remove a chip from its remove button.
- When draft is empty, `Backspace` removes the previous chip.
- `Escape` clears draft text without changing committed chips.
- Disabled blocks all mutation and focus-driven actions.
- Readonly allows reading/copying focused content but blocks mutation.

Accessibility direction:

- Use native input focus as the main focus target.
- Ensure remove buttons have value-specific accessible labels.
- Wire `aria-invalid` and pass-through `id`, `name`, `form`, `autocomplete`,
  and `aria-*` attrs where sensible.
- If suggestions are added later, treat that as a combobox/listbox slice with
  explicit keyboard and aria ownership.

## Scope

In scope for implementation:

- `packages/web/src/components/puChip/`
- new `packages/web/src/components/puChipInput/`
- new `packages/web/src/components/puChipsEditor/`
- `packages/web/src/components/puChipGroup/` only if composition exposes a
  layout issue
- component registry and global component type generation
- `packages/web/src/stories/display/PuChip.story.vue`
- new `packages/web/src/stories/forms/PuChipInput.story.vue`
- new `packages/web/src/stories/forms/PuChipsEditor.story.vue`
- `packages/web/skill.seed.json`
- generated design-web skill references
- changeset if package public API or runtime behavior changes

Out of scope:

- `packages/uniapp/`
- converting `PuTag` into an interactive or form component
- adding a generic autocomplete/combobox in the first slice
- schema-driven form validation
- task-packet-only changesets

## Implementation Slices

1. Shape alignment.
   - Add `shape` to `PuChip`.
   - Default `PuChip` to `rect`.
   - Confirm `PuTag` remains default `rect`.
   - Update stories, seed docs, generated references, and changeset.

2. `PuChipInput` contract.
   - Keep the value string-backed, not array-backed.
   - Add props, emits, public types, and file structure for one editable chip.
   - Forward native input attrs to the internal input for normal form behavior.

3. `PuChipInput` behavior.
   - Render a native input inside `PuChip` geometry.
   - Implement live value updates, Enter commit, optional blur commit, Escape
     cancel, remove, disabled, readonly, invalid, and maxlength.
   - Keep app validation outside the component except for invalid styling.

4. `PuChipsEditor` correction.
   - Move the previously implemented string-array component to
     `PuChipsEditor`.
   - Preserve draft, separator, max, duplicate, clear, Backspace removal, IME,
     hidden input serialization, disabled, readonly, and invalid behavior.

5. Styling and composition.
   - Reuse field-control vocabulary from `PuInput` where appropriate.
   - Match `PuFormItem` composition expectations.
   - Keep chip layout stable across wrapping and dense form surfaces.

6. Stories and docs.
   - Add single-chip editing, group editing, commit-on-blur, states, and slot
     stories for `PuChipInput`.
   - Move collection editing stories to `PuChipsEditor`.
   - Update `skill.seed.json` and regenerate design-web skill references.

7. Verification.
   - Run package generation and verification commands listed below.

## Verification Plan

For task-packet-only edits:

```powershell
git status --short
```

For source implementation:

```powershell
pnpm --filter @partner-up-dev/design-web run generate
pnpm --filter @partner-up-dev/design-web run skill:generate
pnpm --filter @partner-up-dev/design-web run type-check
pnpm --filter @partner-up-dev/design-web run story:coverage
pnpm --filter @partner-up-dev/design-web run build
pnpm --filter @partner-up-dev/design-web run story:build
```

If a test harness exists or is added, cover:

- `PuChipInput` emit payloads, Enter commit, Escape cancel, remove, disabled,
  readonly, and maxlength behavior.
- `PuChipsEditor` duplicate and max rejection, separator and Enter commit, IME
  composition guard, Backspace removal, disabled and readonly mutation blocking,
  and remove button labels.

## Open Questions

- Should `PuChipsEditor` eventually render committed chips as editable
  `PuChipInput` instances by default, or keep committed chips display-like and
  leave inline editing to a custom chip slot?
- Should native form serialization be supported through hidden inputs, and if
  so should `PuChipsEditor` continue serializing repeated `name` fields or move
  to a delimiter-joined value?
- Should `allowDuplicates` exist, or should duplicates always be rejected until
  a product case proves otherwise in `PuChipsEditor`?
- Should value normalization be customizable, or is trim-only enough for the
  first version of `PuChipsEditor`?
- Should `PuChipsEditor` expose suggestions in the first version, or should
  suggestions wait for a dedicated `PuAutocomplete` / combobox contract?

## Non-Goals

- Do not implement source changes until the user explicitly starts execution.
- Do not add a changeset for this task packet alone.
- Do not make `PuTag` removable, selectable, or editable.
- Do not turn `PuChipGroup` into a form controller unless a later task proves
  that generic group selection is needed outside `PuChipsEditor`.

## Implementation Record

Created on 2026-06-14.

Implemented on 2026-06-14.

Corrected on 2026-06-15 after the component boundary was clarified.

Implemented decisions:

- Added `shape` to `PuChip` with `rect` as the default and `pill` as the
  alternate geometry.
- Kept `PuTag` unchanged as a non-interactive display label; its default shape
  remains `rect`.
- Added `PuChipInput` as a single editable chip component with `modelValue:
  string`.
- `PuChipInput` renders a native input inside `PuChip` geometry.
- `PuChipInput` supports live model updates, Enter commit, optional blur commit,
  Escape cancel, remove, disabled, readonly, invalid, maxlength, size, variant,
  tone, shape, prefix/suffix icons, and prefix/suffix/remove-icon slots.
- `PuChipInput` keeps the default neutral tone, and surface-backed neutral chip
  inputs use primary for the focused active border unless invalid overrides it
  with the error color.
- Moved the previous string-array chip entry implementation to
  `PuChipsEditor`.
- `PuChipsEditor` composes `PuChipGroup`, `PuChip`, and a native text input.
- `PuChipsEditor` supports `modelValue`, optional controlled `draftValue`,
  Enter/separator commit, optional blur commit, Backspace removal, Escape draft
  clearing, duplicate rejection, max enforcement, clear, disabled, readonly,
  invalid, size, variant, tone, and shape.
- `PuChipsEditor` keeps the default neutral tone, and neutral outline editors
  use primary for the focused active border unless invalid overrides it with the
  error color.
- `PuChipsEditor` forwards native control attrs to the visible draft input,
  while serializing committed chips as repeated hidden inputs when a `name` attr
  is provided.
- Added Histoire stories for `PuChip` shapes, `PuChipInput` single-chip
  editing, and `PuChipsEditor` controlled usage, separators, blur commit,
  limits, variants, states, and slots.
- Added generated registry/global type exports for `PuChipInput` and
  `PuChipsEditor`.
- Updated generated design-web skill references and `skill.seed.json`.
- Added `.changeset/chip-input-field.md` as the patch bump record for
  `@partner-up-dev/design-web`.

Touched files:

- `packages/web/src/components/puChip/`
- `packages/web/src/components/puChipInput/`
- `packages/web/src/components/puChipsEditor/`
- `packages/web/src/stories/display/PuChip.story.vue`
- `packages/web/src/stories/forms/PuChipInput.story.vue`
- `packages/web/src/stories/forms/PuChipsEditor.story.vue`
- `packages/web/skill.seed.json`
- `packages/web/src/component-registry.ts`
- `packages/web/types/components.d.ts`
- `packages/web/src/version.ts`
- `packages/web/skills/design-web/references/`
- `.changeset/chip-input-field.md`

Verification:

```powershell
pnpm --filter @partner-up-dev/design-web run type-check
pnpm --filter @partner-up-dev/design-web run verify
```

Release note:

- The package remains at `0.4.2` in source until `changeset version` consumes
  the pending patch changesets and writes the release version/changelog.
