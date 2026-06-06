# PuCellGroup And PuCell IA Discussion

Status:

```
Discussion draft on 2026-05-13.
Visual-density fix and PuCellGroup first slice implemented on 2026-05-13.
```

## Problem Statement

Current `PuCell` works as a compact title/value row, but its information
architecture is underspecified.

Follow-up correction:

```
The most visible current issue is visual density, especially title font size and
horizontal padding. IA expansion remains useful for PuCellGroup and richer rows,
but the next narrow fix should address Cell typography and row padding first.
```

Current shape:

```
PuCell
+-- title
+-- right
    +-- value
    +-- suffix
```

Observed issues:

```
Title currently uses body-large, which reads too large for compact list rows.
Cell padding currently has zero horizontal inset.
The default slot maps to value, not the main content area.
The suffix is visually attached to value, but semantically it is a trailing affordance.
The row has no leading slot for icon/avatar/selection mark.
The row has no description/subtitle area.
The border prop is owned by each cell, which makes repeated groups noisy.
The component can be used as button/a, but action semantics are not explicit in the IA.
```

## Proposed Boundary

`PuCell` should be a row primitive for settings, navigation, and action lists.

`PuCellGroup` should own grouping, surface, dividers, header, and footer.

`PuDescriptionItem` should remain the semantic fact item inside a `<dl>`.

## Immediate Visual Fix

Recommended first change:

```scss
.pu-cell {
  padding: var(--sys-spacing-small) var(--sys-spacing-medium);
}

.pu-cell__title {
  @include pu-font(body-medium);
}
```

Reasoning:

```
body-large makes the title dominate the row.
body-medium better matches a compact settings/list row.
horizontal padding gives standalone and interactive cells a real hit-area inset.
PuCellGroup can later tune this through CSS variables or inherited density.
```

Possible implementation detail:

```scss
.pu-cell {
  --pu-cell-padding-block: var(--sys-spacing-small);
  --pu-cell-padding-inline: var(--sys-spacing-medium);

  padding: var(--pu-cell-padding-block) var(--pu-cell-padding-inline);
}
```

This keeps PuCellGroup able to adjust row density without adding extra props to
PuCell immediately.

Implementation record:

```
packages/web/src/components/puCell/puCell.scss
packages/web/src/components/puCellGroup/puCellGroup.ts
packages/web/src/components/puCellGroup/puCellGroup.vue
packages/web/src/components/puCellGroup/puCellGroup.scss
packages/web/src/stories/display/PuCellGroup.story.vue
tasks/content-presentation-components/pu-cell-group.md
```

Decision rule:

```
Use PuCell when the row can be acted on, scanned as a list item, or paired with
leading/trailing affordances.

Use PuDescriptionList + PuDescriptionItem when the content is a semantic
label/value fact group. Use local markup for rare one-off facts that do not need
a public component contract.
```

## Proposed PuCell IA

Target shape:

```
component.pu-cell
+-- leading
+-- content
|   +-- title
|   +-- description
+-- meta
|   +-- value
+-- trailing
```

Meaning:

```
leading      icon, avatar, checkbox proxy, status marker
content      primary row content
title        primary label
description  secondary explanatory text
meta         secondary right-side text, badge, count, status
trailing     chevron, external-link icon, switch, custom action affordance
```

This makes vertical and horizontal composition an outcome of content density:

```
simple row:
+-- title
+-- meta/value
+-- trailing

rich row:
+-- leading
+-- content
|   +-- title
|   +-- description
+-- trailing
```

## Proposed PuCellGroup IA

Target shape:

```
component.pu-cell-group
+-- optional header
|   +-- title
|   +-- description
+-- body
|   +-- PuCell
|   +-- PuCell
|   +-- PuCell
+-- optional footer
```

Group-owned behavior:

```
surface tone
padding / inset
divider rendering
density
header/footer spacing
rounded container clipping
```

Cell-owned behavior:

```
row content
interactive root
disabled/loading state
selected/current state
leading/trailing slots
```

## Initial API Sketch

### PuCellGroup

```ts
props = {
  as?: string;                 // default "section"
  title?: string;
  description?: string;
  tone?: "plain" | "surface" | "section" | "inset-high" | "outline";
  density?: "compact" | "comfortable";
  dividers?: boolean;          // default true
  inset?: boolean;             // default false
}
```

Slots:

```ts
header
title
description
default
footer
```

Emits:

```ts
(none)
```

### PuCell

```ts
props = {
  as?: string;                 // default "div"
  type?: "button" | "submit" | "reset";
  title?: string;
  description?: string;
  value?: string | number | null;
  suffixIcon?: string;
  disabled?: boolean;
  selected?: boolean;
}
```

Slots:

```ts
leading
title
description
value
trailing
suffix      legacy alias candidate
default     proposed to map to content body only after migration decision
```

Emits:

```ts
click(event)
```

## Migration Concern

Current `PuCell` uses default slot as value content:

```
<PuCell>
  Slot value
</PuCell>
```

Changing default slot semantics would be a breaking IA change. Options:

```
1. Keep default slot as value for now and add explicit title/description/leading/trailing slots.
2. Introduce value slot and keep default as a backward-compatible alias during one migration window.
3. Change default slot to main content and accept a breaking change before external adoption.
```

Recommended direction:

```
Prefer option 2 while packages/web is still pre-adoption. It makes the target IA
clear while giving current stories and demos a small migration path.
```

## Story Coverage Needed

```
PuCell Basic
PuCell Rich Content
PuCell Interactive Rows
PuCellGroup Plain
PuCellGroup Surface With Dividers
PuCellGroup Header/Footer
PuCellGroup Dense
```
