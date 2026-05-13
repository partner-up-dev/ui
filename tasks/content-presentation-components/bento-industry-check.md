# PuBentoGrid Industry Check

Status:

```
Research note on 2026-05-13.
Implementation started on 2026-05-13.
```

## Goal

Validate PuBentoGrid / PuBentoItem against current UI library practice, using
mvp-HA only as product evidence.

## Source Classes

Mainstream UI libraries:

```
Material UI
Ant Design
Chakra UI
Mantine
Radix Themes
```

Bento/block libraries:

```
Magic UI
Aceternity UI
```

## Findings

### 1. Mainstream Libraries Expose Grid/Card, Not Bento

Observed pattern:

```
Grid owns layout mechanics:
+-- columns
+-- gap/gutter
+-- responsive breakpoints
+-- per-child span
+-- sometimes row span / auto rows

Card owns related content/actions surface:
+-- surface
+-- size/tone/variant
+-- content and actions
```

Examples:

```
MUI Grid: responsive columns, breakpoints, gap; row spanning delegated to CSS Grid.
Ant Design Grid: 24-column Row/Col, responsive gutter and span.
Chakra Grid: Grid + GridItem, colSpan and rowSpan.
Mantine Grid: 12-column Grid.Col span; SimpleGrid for equal-width grids.
Radix Themes: Grid with responsive columns/rows/gap/flow and Card for grouped
related content/actions.
```

Implication:

```
PuBentoGrid should be a thin responsive CSS Grid policy.
PuBentoItem should be a surface/content tile with span metadata.
```

### 2. Bento Libraries Treat Bento As A Feature Section Pattern

Observed pattern:

```
BentoGrid
+-- BentoCard / BentoGridItem
    +-- icon/header/media/skeleton
    +-- title/name
    +-- description
    +-- CTA/content
```

Examples:

```
Magic UI: BentoGrid + BentoCard for feature showcase.
Aceternity UI: BentoGridItem with title, description, header, icon; examples
target landing/product feature sections and rich animated panels.
```

Implication:

```
For PartnerUp admin usage, Bento should remain operational and information-dense.
Avoid locking the component to marketing-only imagery, animations, or CTA schema.
```

### 3. mvp-HA Evidence

Current mvp-HA Admin Bento:

```
BentoLayout
+-- 2-column desktop grid
+-- 1-column mobile collapse

BentoItem
+-- title
+-- optional description
+-- optional actions
+-- body
+-- span: "full" | "half"
```

Useful parts:

```
tile header/actions/body IA
full-width tile support
responsive collapse
surface treatment
```

Parts to improve:

```
binary span vocabulary is too narrow
layout is fixed to two columns
row spanning is unavailable
header is always present through required title
surface and tile IA are tightly coupled
```

## Design Principles For PuBento

```
1. Use mainstream Grid/Card boundaries.
2. Keep tile header optional and slot-based.
3. Support numeric spans plus "full".
4. Support rowSpan because Bento often needs asymmetric emphasis.
5. Collapse safely on mobile.
6. Use existing PuGap and PuSurfaceTone vocabularies.
7. Keep content schema-free.
8. Let consumers compose PageHeader, DescriptionList, CellGroup, EmptyState,
   FileUpload, or arbitrary content inside each tile.
```

## Recommended API

```ts
PuBentoGrid.props = {
  as?: string;                       // default "div"
  columns?: 2 | 3 | 4;                // default 2
  gap?: PuGap;                        // default "md"
  collapseAt?: PuBreakpoint;          // default "md"; switch to one column at this breakpoint and below
  autoRows?: string;                  // default "minmax(120px, auto)"
  dense?: boolean;                    // default false
}

PuBentoItem.props = {
  as?: string;                        // default "section"
  title?: string;
  description?: string;
  span?: 1 | 2 | 3 | 4 | "full";      // default 1
  rowSpan?: 1 | 2 | 3;                // default 1
  tone?: PuSurfaceTone;               // default "section"
  density?: PuDensity;                // default "comfortable"
}
```

Prop notes:

```
collapseAt belongs to PuBentoGrid.

It controls the responsive threshold where the Bento grid collapses from the
configured multi-column layout into a single-column layout.

Example:

columns="3" collapseAt="md"

wide viewport:
+-- column 1 --+-- column 2 --+-- column 3 --+

md and below:
+-- column 1 --+
+-- column 1 --+
+-- column 1 --+

The prop describes layout behavior only. It does not hide items, change tile
content, or alter PuBentoItem density/tone.
```

## Breakpoint Token Audit

Current state on 2026-05-13:

```
packages/web/src/styles/_mixins.scss
+-- $breakpoints:
    +-- sm: 640px
    +-- md: 768px
    +-- lg: 1024px
    +-- xl: 1280px
    +-- 2xl: 1536px

packages/web/src/types/variants.ts
+-- shared API vocabularies for tone, status tone, surface tone, size,
    density, align, layout, gap, orientation
+-- no public PuBreakpoint vocabulary yet

packages/web/src/styles/unocss-preset.ts
+-- token-backed colors, spacing, sizes, radius, fonts
+-- no breakpoint theme yet

packages/web/histoire.config.ts
+-- preview presets:
    +-- Mobile 390px
    +-- Tablet 768px
    +-- Desktop 1200px

component styles
+-- several direct media queries:
    +-- 639px
    +-- 879px
    +-- 900px
    +-- 48rem
```

Implication for PuBentoGrid:

```
collapseAt should use a shared PuBreakpoint vocabulary before implementation.

Recommended first public vocabulary:

type PuBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export const puBreakpoints = ["sm", "md", "lg", "xl", "2xl"] as const;

The numeric values should be defined once and reused by Sass, docs, Histoire
preview labels, and component implementation notes.
```

Slots:

```ts
PuBentoItem:
header
title
description
actions
default
footer
```

## DOM Direction

```html
<div class="pu-bento-grid">
  <section class="pu-bento-item pu-bento-item--span-2 pu-bento-item--row-span-1">
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

## Decision

```
Implement PuBentoGrid / PuBentoItem.
Use mvp-HA as migration evidence.
Use mainstream library Grid/Card boundaries as API guardrails.
```

## Sources

```
MUI Grid:
https://mui.com/material-ui/react-grid/

Ant Design Grid:
https://ant.design/components/grid/

Ant Design Form:
https://ant.design/components/form/

Ant Design Form Page spec:
https://ant.design/docs/spec/research-form/

Chakra SimpleGrid:
https://chakra-ui.com/docs/components/simple-grid

Chakra Grid:
https://chakra-ui.com/docs/components/grid

Mantine SimpleGrid:
https://mantine.dev/core/simple-grid

Mantine Grid:
https://mantine.dev/core/grid

Radix Themes Grid:
https://www.radix-ui.com/themes/docs/components/grid

Radix Themes Card:
https://www.radix-ui.com/themes/docs/components/card

Magic UI Bento Grid:
https://magicui.design/docs/components/bento-grid

Aceternity UI Bento Grid:
https://ui.aceternity.com/components/bento-grid
```
