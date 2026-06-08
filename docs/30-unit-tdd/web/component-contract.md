# Web Component Contract

This Unit TDD document defines the default contract for public components in
`@partner-up-dev/design-web`.

## Naming

Public components use the `Pu` prefix:

```
PuDescriptionList
PuDescriptionItem
PuInlineNotice
```

Component source folders use lower camel case after the prefix:

```
src/components/puDescriptionList/
+-- puDescriptionList.vue
+-- puDescriptionList.ts
+-- puDescriptionList.scss
+-- index.ts
```

CSS class blocks use kebab case:

```
.pu-description-list
.pu-description-list__header
.pu-component--variant-outline
.pu-description-list.is-disabled
```

## Variant Vocabulary

New public APIs should reuse `src/types/variants.ts` before defining local
unions.

Canonical values:

```
tone:
  neutral | primary | secondary | tertiary | danger

status tone:
  info | success | warning | error

control variant:
  solid | soft | outline | ghost | dashed

container variant:
  plain | soft | outline | solid

surface level:
  plain | surface | section | inset-high

shape:
  rect | pill | circle

size:
  sm | md | lg

extended size:
  xs | sm | md | lg | xl

density:
  compact | comfortable

align:
  start | center | end

layout:
  stack | inline | grid

gap:
  none | xs | sm | md | lg

breakpoint:
  sm | md | lg | xl | 2xl

orientation:
  horizontal | vertical
```

Local variants are allowed when a concept is genuinely component-specific.
Those variants should be named after the component:

```ts
type PuWheelPickerTone = PuTone;
type PuDescriptionListLayout = PuLayout;
```

Do not put treatment values into `tone`. `outline`, `ghost`, `dashed`, and
`soft` are variants. `surface`, `section`, and `inset-high` are neutral surface
levels. `danger` is a semantic tone for destructive or risky actions; `error`
is a status tone for failed or invalid state.

## Props

Use stable semantic prop names:

```
modelValue       controlled value
defaultValue     uncontrolled initial value
disabled         non-interactive state
readonly         readable but immutable state
loading          pending command state
error            invalid or failed state
tone             semantic color intent
status           semantic feedback state when info/success/warning/error matters
variant          visual treatment
surfaceLevel     neutral page or content surface depth
shape            bounded geometry
size             dimensional scale
density          spacing density
layout           structural arrangement
align            inline alignment
as               semantic root element
```

Avoid adding both `theme` and `tone` to new components. New components use
`tone`.

`as` is appropriate when semantic root choice matters:

```ts
as?: string
```

Prefer Vue attrs pass-through for root `class` and `style`. Add explicit
`customClass` or `customStyle` only for compatibility with an existing API.

## Slots

Use these slot names consistently:

```
default      main content
header       structural header region
footer       structural footer region
title        title override
description  description override
label        field, fact, or item label override
prefix       inline leading adornment
suffix       inline trailing adornment
actions      command group
meta         secondary metadata
empty        empty state region
option       repeated option renderer
```

Slot props should be small and explicit:

```ts
option({ option, index, active, selected, disabled })
```

## Events

Use these event names:

```
update:modelValue  v-model updates
change             committed value changes
click              native-like command activation
close              dismiss, overlay close, or dialog close
confirm            positive confirmation
cancel             negative dismissal
focus              focus event forwarding
blur               blur event forwarding
```

Event payloads should include the domain value first, then context:

```ts
change(value, option, index)
```

## Controlled And Uncontrolled State

Use controlled state for form fields and selection:

```ts
modelValue
update:modelValue
change
```

Use uncontrolled state for simple disclosure when external control is not needed:

```ts
defaultExpanded
```

If both controlled and uncontrolled modes are supported, use:

```ts
modelValue?: T
defaultValue?: T
update:modelValue
change
```

## Accessibility

Every interactive component should define:

```
keyboard behavior
focus target
aria role when native semantics are insufficient
aria-label or labelledby path for icon-only controls
disabled behavior
```

Use native elements first:

```
button for commands
a for navigation
input/textarea/select where browser behavior is desired
dl/dt/dd for description lists
dialog semantics for modal dialogs when supported by implementation
```

Overlay and disclosure components should share composables for:

```
id generation
escape key handling
body scroll lock
focus management
```

## Styling

Public visual variants should map to CSS variables first and class modifiers
second.

Component variable format:

```
--pu-<component>-<part>-<property>
```

Examples:

```
--pu-description-list-label-width
--pu-description-list-item-padding-block
--pu-inline-notice-icon-color
```

Modifier class format:

```
.pu-component--tone-primary
.pu-component--variant-outline
.pu-component--surface-level-section
.pu-component--size-md
.pu-component--density-compact
.pu-component.is-disabled
.pu-component.is-active
```

Use existing global tokens:

```
--sys-*
--dcs-*
--ref-*
```

## Composition Principles

Follow `composition-principles.md` as the durable source for ownership,
composition, tokens, local CSS, and adaptive layout decisions in this Unit TDD
directory.

For component authors, add query boundaries only where the component owns the
measured layout region. Avoid arbitrary leaf-level containers.

When a component creates a query boundary, name it after the owning component or
region:

```scss
.pu-page-scaffold {
  container: pu-page / inline-size;
}

@container pu-page (max-width: 56.25rem) {
  .pu-page-scaffold__shell {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

## Source File Shape

Preferred public component folder:

```
src/components/puExample/
+-- puExample.vue
+-- puExample.ts
+-- puExample.scss
+-- index.ts
```

Responsibilities:

```
*.vue   template, setup, emits wiring
*.ts    props, emits, public types
*.scss  component styles
index.ts optional local re-export
```

## Verification

Minimum check before merging component changes:

```powershell
pnpm --filter @partner-up-dev/design-web type-check
pnpm --filter @partner-up-dev/design-web build
```

For interactive or semantic components, add targeted tests when the test harness
exists:

```
keyboard behavior
emits
aria attributes
responsive layout state
```
