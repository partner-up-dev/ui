# PuDescriptionList / PuDescriptionItem Plan

Status:

```
Implemented in packages/web on 2026-05-12.
Awaiting visual review and API refinement.
```

## Implementation Record

Source files:

```
packages/web/src/components/puDescriptionList/context.ts
packages/web/src/components/puDescriptionList/puDescriptionList.ts
packages/web/src/components/puDescriptionList/puDescriptionList.vue
packages/web/src/components/puDescriptionList/puDescriptionList.scss
packages/web/src/components/puDescriptionItem/puDescriptionItem.ts
packages/web/src/components/puDescriptionItem/puDescriptionItem.vue
packages/web/src/components/puDescriptionItem/puDescriptionItem.scss
```

Generated files:

```
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
```

Story:

```
packages/web/src/stories/display/PuDescriptionList.story.vue
```

Story coverage note:

```
PuDescriptionList.story.vue declares:
@pu-story-covers PuDescriptionList PuDescriptionItem
```

## Role

PuDescriptionList is the semantic group for name-value facts.

PuInfoRow remains useful for isolated facts. PuDescriptionList provides the
group-level structure, header, density, dividers, layout, and semantic `dl`
relationship.

## Primary Use Cases

```
event facts
order facts
profile details
rules summary
settings preview
review details
admin read-only records
```

## Information Architecture

```
PuDescriptionList
+-- optional header
|   +-- title
|   +-- optional description
|   +-- optional actions/meta
+-- fact group
|   +-- PuDescriptionItem
|   +-- PuDescriptionItem
|   +-- PuDescriptionItem
+-- optional footer
```

## DOM Target

Default semantic DOM:

```html
<section class="pu-description-list">
  <header class="pu-description-list__header">
    <h2 class="pu-description-list__title">...</h2>
    <p class="pu-description-list__description">...</p>
  </header>

  <dl class="pu-description-list__body">
    <div class="pu-description-item">
      <dt class="pu-description-item__label">Time</dt>
      <dd class="pu-description-item__value">May 12, 19:00</dd>
    </div>
  </dl>

  <footer class="pu-description-list__footer">...</footer>
</section>
```

ASCII structure:

```
section.pu-description-list
+-- header.pu-description-list__header
|   +-- h2.pu-description-list__title
|   +-- p.pu-description-list__description
|   +-- slot.header
+-- dl.pu-description-list__body
|   +-- div.pu-description-item
|       +-- dt.pu-description-item__label
|       +-- dd.pu-description-item__value
|           +-- value
+-- footer.pu-description-list__footer
    +-- slot.footer
```

## Public API Draft

### PuDescriptionList

```ts
type PuDescriptionListLayout = "stack" | "inline" | "grid";
type PuDescriptionListDensity = "compact" | "comfortable";
type PuDescriptionListTone =
  | "plain"
  | "surface"
  | "section"
  | "inset-high"
  | "outline";
type PuDescriptionListLabelAlign = "start" | "end";

props = {
  as?: string;                         // default "section"
  title?: string;
  description?: string;
  layout?: PuDescriptionListLayout;    // default "stack"
  density?: PuDescriptionListDensity;  // default "comfortable"
  tone?: PuDescriptionListTone;        // default "plain"
  bordered?: boolean;                  // default false
  dividers?: boolean;                  // default true
  labelWidth?: string;                 // default "7rem"
  labelAlign?: PuDescriptionListLabelAlign; // default "start"
  columns?: 1 | 2;                     // default 1
  collapseOnMobile?: boolean;          // default true
  emptyText?: string;                  // default "-"
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

### PuDescriptionItem

```ts
props = {
  label?: string;
  value?: string | number | null;
  hint?: string;
  span?: 1 | 2;
  valueAlign?: "start" | "center" | "end";
  emptyText?: string;
}
```

Slots:

```ts
label
default
hint
suffix
```

Emits:

```ts
(none)
```

## Actual Provide / Inject Contract

```
PuDescriptionList
+-- provides layout
+-- provides density
+-- provides tone
+-- provides dividers
+-- provides labelWidth
+-- provides labelAlign
+-- provides columns
+-- provides collapseOnMobile
+-- provides emptyText

PuDescriptionItem
+-- injects list context when present
+-- falls back to stack / comfortable / 7rem / "-" when used alone
```

## Layout Modes

### stack

```
Label
Value

Label
Value
```

Use for:

```
mobile-first detail blocks
long values
mixed value content
```

### inline

```
Label ---------------- Value
Label ---------------- Value
Label ---------------- Value
```

Use for:

```
compact fact cards
settings previews
short values
```

### grid

```
Label ---- Value     Label ---- Value
Label ---- Value     Label ---- Value
```

Use for:

```
desktop record details
admin pages
wide cards with many short facts
```

Responsive rule:

```
collapseOnMobile=true
+-- grid becomes one column below the mobile breakpoint
+-- inline can become stack when the value needs readability
```

## Token Strategy

Use existing mvp-HA token layer already copied into design-web:

```
spacing: --sys-spacing-*
color:   --sys-color-*
radius:  --sys-radius-*
type:    @include pu-font(...)
page:    --dcs-layout-page-max-width when needed by parent only
```

Component CSS variables:

```
--pu-description-list-label-width
--pu-description-list-grid-columns
--pu-description-list-item-padding-block
```

## Expected Composition

```vue
<PuDescriptionList
  title="Event facts"
  layout="inline"
  tone="surface"
  dividers
>
  <PuDescriptionItem label="Time">
    May 12, 19:00
  </PuDescriptionItem>
  <PuDescriptionItem label="Location">
    West Lake, Hangzhou
  </PuDescriptionItem>
  <PuDescriptionItem label="People">
    12 / 20
  </PuDescriptionItem>
</PuDescriptionList>
```

## Relationship To Existing Components

```
PuInfoRow
+-- isolated single fact
+-- useful inside custom layouts

PuDescriptionList
+-- grouped facts
+-- semantic dl relationship
+-- header and footer support
+-- consistent density and dividers

PuCell
+-- row item with action/link affordance
+-- better for navigation and setting rows
```

## Implementation Notes

```
1. Use provide/inject for list-level layout props so items stay compact.
2. Keep item value slot as the primary customization path.
3. Keep label slot for rich labels, icons, or required markers.
4. Keep suffix slot for small trailing actions or badges.
5. Preserve accessible name-value relationship with dt/dd in the default path.
```
