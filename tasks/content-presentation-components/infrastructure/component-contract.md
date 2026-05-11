# Component Contract

Status:

```
Added public component contract to packages/web/docs/component-contract.md.
This file records the task-packet copy of the decisions.
```

## Core Decision

Public web components should be predictable across these dimensions:

```
naming
variant values
props
slots
events
controlled state
accessibility
styling
source file shape
verification
```

## Naming

Component names:

```
Pu*
```

Folder names:

```
src/components/puExample/
```

CSS blocks:

```
.pu-example
.pu-example__part
.pu-example--tone-primary
.pu-example.is-disabled
```

## Props

Preferred public prop names:

```
modelValue
defaultValue
disabled
readonly
loading
error
tone
status
size
density
layout
align
as
```

New components use:

```
tone
```

Existing compatibility APIs may still expose:

```
theme
```

## Slots

Standard slot names:

```
default
header
footer
title
description
label
prefix
suffix
actions
meta
empty
option
```

Slot props should be explicit and small:

```
option({ option, index, active, selected, disabled })
```

## Events

Standard event names:

```
update:modelValue
change
click
close
confirm
cancel
focus
blur
```

Payload order:

```
domain value first
context second
index or native event last
```

Example:

```ts
change(value, option, index)
```

## Controlled State

Use controlled mode for form and selection primitives:

```
modelValue
update:modelValue
change
```

Use uncontrolled state for simple disclosure:

```
defaultExpanded
```

Components that support both modes should use:

```
modelValue?: T
defaultValue?: T
```

## Accessibility

Minimum expectation:

```
native element first
clear keyboard behavior
focus target
aria role when native semantics are insufficient
aria-label path for icon-only controls
disabled behavior
```

Recommended composables:

```
useId
useBodyScrollLock
useEscapeKey
useControllableState
useFocusTrap
useRovingFocus
```

## Styling

Component CSS variables:

```
--pu-<component>-<part>-<property>
```

Modifier classes:

```
.pu-component--tone-primary
.pu-component--size-md
.pu-component--density-compact
.pu-component.is-disabled
.pu-component.is-active
```

## Verification

Current minimum:

```powershell
pnpm --filter @partner-up-dev/design-web type-check
pnpm --filter @partner-up-dev/design-web build
```

Future test targets:

```
keyboard behavior
emits
aria attributes
responsive layout
visual states
```

