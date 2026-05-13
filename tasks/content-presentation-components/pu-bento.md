# PuBentoGrid / PuBentoItem

Status:

```
Implemented on 2026-05-13.
Source target: packages/web/src/components/puBentoGrid
Source target: packages/web/src/components/puBentoItem
Story target: packages/web/src/stories/display/PuBentoGrid.story.vue
```

## Intent

```
PuBentoGrid
+-- responsive asymmetric grid policy for overview and admin pages
+-- owns columns, gap, auto row height, collapse threshold, dense placement

PuBentoItem
+-- composable tile inside PuBentoGrid
+-- owns surface tone, density, span metadata, optional heading IA
+-- accepts arbitrary operational content through slots
```

## Information Architecture

```
PuBentoGrid
+-- slot: default
    +-- PuBentoItem
    +-- PuBentoItem
    +-- PuBentoItem
```

```
PuBentoItem
+-- root: section by default
    +-- header?                         present when header/title/description/actions exists
    |   +-- header slot?                replaces default header IA
    |   +-- heading                     default header IA
    |   |   +-- title?                  prop or title slot
    |   |   +-- description?            prop or description slot
    |   +-- actions?                    actions slot
    +-- body?                           default slot
    +-- footer?                         footer slot
```

## DOM Sketch

```html
<div class="pu-bento-grid pu-bento-grid--columns-4 pu-bento-grid--gap-md pu-bento-grid--collapse-at-md is-dense">
  <section class="pu-bento-item pu-bento-item--span-2 pu-bento-item--row-span-2 pu-bento-item--tone-section pu-bento-item--density-comfortable is-with-header is-with-footer">
    <header class="pu-bento-item__header">
      <div class="pu-bento-item__heading">
        <h2 class="pu-bento-item__title"></h2>
        <p class="pu-bento-item__description"></p>
      </div>
      <div class="pu-bento-item__actions"></div>
    </header>
    <div class="pu-bento-item__body"></div>
    <footer class="pu-bento-item__footer"></footer>
  </section>
</div>
```

## Props

```ts
type PuBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

type PuBentoGridColumns = 2 | 3 | 4;

interface PuBentoGridProps {
  as?: string;                 // default "div"
  columns?: PuBentoGridColumns; // default 2
  gap?: PuGap;                 // default "md"
  collapseAt?: PuBreakpoint;   // default "md"
  autoRows?: string;           // default "minmax(120px, auto)"
  dense?: boolean;             // default false
}

type PuBentoItemSpan = 1 | 2 | 3 | 4 | "full";
type PuBentoItemRowSpan = 1 | 2 | 3;

interface PuBentoItemProps {
  as?: string;                  // default "section"
  title?: string;
  description?: string;
  span?: PuBentoItemSpan;       // default 1
  rowSpan?: PuBentoItemRowSpan; // default 1
  tone?: PuSurfaceTone;         // default "section"
  density?: PuDensity;          // default "comfortable"
}
```

## Slots

```ts
PuBentoGrid:
default

PuBentoItem:
header
title
description
actions
default
footer
```

## Emits

```ts
PuBentoGrid:
none

PuBentoItem:
none
```

## Responsive Behavior

```
collapseAt="md"

>= 768px:
+-- configured columns
+-- item span and rowSpan apply

< 768px:
+-- grid columns become 1
+-- item grid-column becomes 1 / -1
+-- item grid-row becomes auto
```

## Design Notes

```
Grid and item responsibilities stay separate.
Tile title and description are optional.
Header slot can replace the default title/description/actions IA.
Row span is available for asymmetric emphasis.
Item content remains schema-free for admin dashboards and product surfaces.
Item spans that exceed the configured column count resolve to full width.
```

## Verification

Commands:

```powershell
pnpm --filter @partner-up-dev/design-web type-check
pnpm --filter @partner-up-dev/design-web build
pnpm --filter @partner-up-dev/design-web story:coverage
pnpm --filter @partner-up-dev/design-web story:build
```

Browser smoke at `http://localhost:6006`:

```
Route:
/story/src-stories-display-pubentogrid-story-vue?variantId=src-stories-display-pubentogrid-story-vue-0

Frame DOM:
+-- .pu-bento-grid count: 1
+-- .pu-bento-item count: 5
+-- visible text: Anchor event, Applications
+-- grid class includes:
    +-- pu-bento-grid--columns-4
    +-- pu-bento-grid--gap-md
    +-- pu-bento-grid--collapse-at-md
    +-- is-dense
+-- first item class includes:
    +-- pu-bento-item--span-2
    +-- pu-bento-item--row-span-2
    +-- pu-bento-item--tone-section
    +-- pu-bento-item--density-comfortable

Console errors:
0
```
