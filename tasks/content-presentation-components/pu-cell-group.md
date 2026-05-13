# PuCellGroup

Status:

```
Implemented in packages/web on 2026-05-13.
Awaiting visual review and API refinement.
```

## Implementation Record

Source files:

```
packages/web/src/components/puCellGroup/puCellGroup.ts
packages/web/src/components/puCellGroup/puCellGroup.vue
packages/web/src/components/puCellGroup/puCellGroup.scss
```

Related changed file:

```
packages/web/src/components/puCell/puCell.scss
```

Generated files:

```
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
```

Story:

```
packages/web/src/stories/display/PuCellGroup.story.vue
```

## Role

PuCellGroup groups settings rows, action rows, and compact scan lists. It owns
surface, dividers, density, header, and footer so individual PuCell instances
can stay focused on row content.

## Information Architecture

```
PuCellGroup
+-- optional header
|   +-- title
|   +-- optional description
+-- body
|   +-- PuCell
|   +-- PuCell
|   +-- PuCell
+-- optional footer
```

## DOM Target

```html
<section
  class="pu-cell-group pu-cell-group--tone-surface pu-cell-group--density-comfortable is-dividers"
  aria-labelledby="pu-cell-group-1-title"
>
  <header class="pu-cell-group__header">
    <div class="pu-cell-group__heading">
      <h2 id="pu-cell-group-1-title" class="pu-cell-group__title">
        Organizer
      </h2>
      <p id="pu-cell-group-1-description" class="pu-cell-group__description">
        Public profile fields
      </p>
    </div>
  </header>
  <div class="pu-cell-group__body">
    <div class="pu-cell">...</div>
    <button class="pu-cell">...</button>
  </div>
  <footer class="pu-cell-group__footer">...</footer>
</section>
```

## Public API

```ts
type PuCellGroupTone =
  | "plain"
  | "surface"
  | "section"
  | "inset-high"
  | "outline";
type PuCellGroupDensity = "compact" | "comfortable";

props = {
  as?: string;                    // default "section"
  title?: string;
  description?: string;
  tone?: PuCellGroupTone;         // default "plain"
  density?: PuCellGroupDensity;   // default "comfortable"
  dividers?: boolean;             // default true
  inset?: boolean;                // default false
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

## PuCell Visual Tuning

Changed:

```
PuCell title typography changed from body-large to body-medium.
PuCell horizontal padding now defaults to var(--sys-spacing-medium).
PuCell padding and min-height are controlled through CSS variables.
```

CSS hooks:

```css
--pu-cell-min-height
--pu-cell-padding-block
--pu-cell-padding-inline
```

PuCellGroup sets these variables by density.

## Story Variants

```
Plain
Surface Dividers
Header Footer
Compact Inset
No Dividers
```
