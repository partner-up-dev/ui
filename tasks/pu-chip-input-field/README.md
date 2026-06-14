# PuChipInput Field Task Packet

## Status

Complete.

## Request

Design a field-level chip input for `packages/web` and align chip/tag geometry:

- Prefer `PuChipInput` over `PuTagInput` for consistency with the existing
  interactive token primitive.
- Keep `PuTag` as a compact non-interactive status or category label.
- Keep `PuChip` as the single chip/token primitive for selected, removable, or
  clickable tokens.
- Add field-level form behavior under a new `PuChipInput` component rather than
  pushing draft-input behavior into each `PuChip`.
- Make chip and tag defaults rectangular. `PuTag` already defaults to
  `shape="rect"`; `PuChip` needs an explicit shape contract instead of its
  current hard-coded pill radius.

## Current Evidence

- `PuTag` current public props are `text`, `tone`, `variant`, `shape`, and
  `size`; it has no emitted events. Its default shape is already `rect`.
- `PuChip` already owns single-token interaction affordances:
  `selected`, `disabled`, `removable`, `click`, `remove`, prefix/suffix slots,
  and remove-icon slot.
- `PuChip` currently has no `shape` prop and its root radius is hard-coded to
  pill styling.
- `PuChipGroup` is currently a layout component only. It owns gap, alignment,
  wrapping, and fit-to-width behavior, but it does not own model state.
- `PuInput` is the package's string-backed single-line field control, but a
  chip input needs inline token rendering, deletion, draft composition, and
  collection model updates that are outside plain `PuInput`.

## Design Claims

- `PuChipInput` is the right field-level name because the rendered editable
  values are chips. "Tag" remains a product/domain word; "chip" is the design
  primitive.
- `PuChip` should not own draft input. A single repeated token should not
  manage collection state, pending text, option creation, or keyboard behavior
  for the whole field.
- `PuChipInput` should compose native input behavior with `PuChipGroup` and
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
type PuChipInputValue = string[];

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

## Interaction Requirements

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
- `packages/web/src/components/puChipGroup/` only if composition exposes a
  layout issue
- component registry and global component type generation
- `packages/web/src/stories/display/PuChip.story.vue`
- new `packages/web/src/stories/forms/PuChipInput.story.vue`
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
   - Add props, emits, public types, and file structure.
   - Decide whether `draftValue` is controlled in the first slice or internal
     only with `update:draftValue` added later.
   - Decide if `name` should serialize a hidden input value in native forms.

3. `PuChipInput` behavior.
   - Render committed chips and inline input.
   - Implement commit, remove, clear, Backspace, Escape, disabled, readonly,
     max, duplicate, separator, blur, and IME behavior.
   - Keep app validation outside the component except for invalid styling.

4. Styling and composition.
   - Reuse field-control vocabulary from `PuInput` where appropriate.
   - Match `PuFormItem` composition expectations.
   - Keep chip layout stable across wrapping and dense form surfaces.

5. Stories and docs.
   - Add controlled, separators, max, duplicate rejection, readonly/disabled,
     invalid, sizes, shape, and FormItem composition stories.
   - Update `skill.seed.json` and regenerate design-web skill references.

6. Verification.
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

- emit payloads
- duplicate and max rejection
- separator and Enter commit
- IME composition guard
- Backspace removal
- disabled and readonly mutation blocking
- remove button labels

## Open Questions

- Should `draftValue` be controlled from the first implementation, or should it
  start internal and expose only committed `modelValue`?
- Should native form serialization be supported through hidden inputs, and if
  so should it serialize repeated `name` fields or a delimiter-joined value?
- Should `allowDuplicates` exist, or should duplicates always be rejected until
  a product case proves otherwise?
- Should value normalization be customizable, or is trim-only enough for the
  first version?
- Should `PuChipInput` expose suggestions in the first version, or should
  suggestions wait for a dedicated `PuAutocomplete` / combobox contract?

## Non-Goals

- Do not implement source changes until the user explicitly starts execution.
- Do not add a changeset for this task packet alone.
- Do not make `PuTag` removable, selectable, or editable.
- Do not turn `PuChipGroup` into a form controller unless a later task proves
  that generic group selection is needed outside `PuChipInput`.

## Implementation Record

Created on 2026-06-14.

Implemented on 2026-06-14.

Implemented decisions:

- Added `shape` to `PuChip` with `rect` as the default and `pill` as the
  alternate geometry.
- Kept `PuTag` unchanged as a non-interactive display label; its default shape
  remains `rect`.
- Added `PuChipInput` as a field-level component for editable string-array chip
  collections.
- `PuChipInput` composes `PuChipGroup`, `PuChip`, and a native text input.
- `PuChipInput` supports `modelValue`, optional controlled `draftValue`,
  Enter/separator commit, optional blur commit, Backspace removal, Escape draft
  clearing, duplicate rejection, max enforcement, clear, disabled, readonly,
  invalid, size, variant, tone, and shape.
- `PuChipInput` forwards native control attrs to the visible input, while
  serializing committed chips as repeated hidden inputs when a `name` attr is
  provided.
- Added Histoire stories for `PuChip` shapes and `PuChipInput` controlled
  usage, separators, blur commit, limits, variants, states, and slots.
- Added generated registry/global type exports for `PuChipInput`.
- Updated generated design-web skill references and `skill.seed.json`.
- Added `.changeset/chip-input-field.md` as the patch bump record for
  `@partner-up-dev/design-web`.

Touched files:

- `packages/web/src/components/puChip/`
- `packages/web/src/components/puChipInput/`
- `packages/web/src/stories/display/PuChip.story.vue`
- `packages/web/src/stories/forms/PuChipInput.story.vue`
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
