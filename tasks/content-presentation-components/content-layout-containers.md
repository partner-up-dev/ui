# Content Layout Containers

Status:

```
Discussion draft on 2026-05-13.
No implementation started.
Updated after mvp-HA Admin scan on 2026-05-13.
```

## Current Baseline

Existing content components already cover semantic blocks:

```
page meaning        -> PuPageHeader
surface block       -> PuSurfaceCard, PuExpandableCard
row groups          -> PuCell, PuCellGroup
facts               -> PuDescriptionList, PuDescriptionItem
feedback/empty      -> PuInlineNotice, PuEmptyState, PuSkeleton
```

The remaining gap is content arrangement inside a page:

```
vertical rhythm
section grouping
responsive card grids
asymmetric overview layouts
media + text compositions
```

## Candidate Set

## Component Promotion Gate

Rule:

```
If a layout can be expressed by four or fewer stable UnoCSS utility classes,
do not introduce a component.
```

Examples that should stay as utilities:

```
flex flex-col gap-3
grid gap-4 md:grid-cols-2
flex items-center justify-between gap-2
```

A component is justified when it owns at least one of these:

```
semantic DOM structure
accessibility contract
responsive policy shared across products
named slots for repeated IA
design-token vocabulary and density/tone decisions
per-child layout metadata such as span/rowSpan
```

Implication:

```
PuStack and generic PuGrid are lower priority because many usages are utility-sized.
PuBentoGrid / PuBentoItem remain justified because they own tile IA, surface,
actions, responsive collapse, and per-item span semantics.
```

## mvp-HA Admin Evidence

Scanned source:

```
F:\CODING\Project\Anana\mvp-HA\apps\frontend\src\domains\admin\ui\layout\BentoLayout.vue
F:\CODING\Project\Anana\mvp-HA\apps\frontend\src\domains\admin\ui\layout\BentoItem.vue
F:\CODING\Project\Anana\mvp-HA\apps\frontend\src\domains\admin\ui\anchor-event\sections\AnchorEventBasicSection.vue
F:\CODING\Project\Anana\mvp-HA\apps\frontend\src\domains\admin\ui\anchor-event\sections\AnchorEventTimeSection.vue
F:\CODING\Project\Anana\mvp-HA\apps\frontend\src\domains\admin\ui\anchor-event\sections\AnchorEventLocationsSection.vue
```

Observed shape:

```
BentoLayout
+-- BentoItem span=full
|   +-- header title/actions
|   +-- editor body
+-- BentoItem
|   +-- editor body
+-- BentoItem
    +-- editor body
```

Current mvp-HA behavior:

```
2-column grid on desktop
single column below 720px
BentoItem has title, optional description, actions, body
span="full" spans all columns
default span behaves as half-width in the 2-column grid
tile surface is outlined/container-like
```

Migration value:

```
Admin pages already depend on this IA.
The component carries product layout semantics beyond utility classes.
It can migrate existing Admin sections with low conceptual churn.
```

### 1. PuStack

Purpose:

```
one-dimensional vertical or horizontal layout primitive
owns gap, alignment, wrap, and optional dividers
```

ASCII:

```
PuStack
+-- item
+-- item
+-- item
```

Best for:

```
form sections
card internals
story examples
settings blocks
compact content groups
```

Potential props:

```ts
props = {
  as?: string;
  direction?: "vertical" | "horizontal";
  gap?: "none" | "xs" | "sm" | "md" | "lg";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
  dividers?: boolean;
}
```

Priority:

```
low
```

Reason:

```
Many stack usages fit the four-utility rule. Revisit only when dividers,
semantic list roles, or shared density rules become repeated.
```

### 2. PuSection

Purpose:

```
semantic content section with header, body, footer, tone, density
```

ASCII:

```
PuSection
+-- header
|   +-- title
|   +-- description
|   +-- actions
+-- body
+-- footer
```

Best for:

```
dashboard sections
profile areas
settings groups
content modules below PuPageHeader
```

Potential props:

```ts
props = {
  as?: string;
  title?: string;
  description?: string;
  tone?: PuSurfaceTone;
  density?: PuDensity;
  divided?: boolean;
}
```

Slots:

```ts
header
title
description
actions
default
footer
```

Priority:

```
high
```

Reason:

```
PuSurfaceCard owns surface. PuSection owns content hierarchy and section chrome.
```

### 3. PuGrid

Purpose:

```
responsive equal-weight grid container
owns min item width, columns, gap, and flow
```

ASCII:

```
PuGrid
+-- item
+-- item
+-- item
+-- item
```

Best for:

```
cards
metric tiles
feature lists
small item galleries
settings summaries
```

Potential props:

```ts
props = {
  as?: string;
  columns?: 1 | 2 | 3 | 4 | "auto";
  minItemWidth?: string;
  gap?: PuGap;
  align?: "start" | "stretch";
  dense?: boolean;
}
```

Priority:

```
low
```

Reason:

```
Most equal grids fit the four-utility rule. Bento can be implemented directly
without introducing a generic grid first.
```

### 4. PuBentoGrid / PuBentoItem

Purpose:

```
asymmetric responsive content grid for overview pages
allows selected items to span columns/rows at desktop sizes
```

ASCII:

```
PuBentoGrid
+-- PuBentoItem span=2
|   +-- content
+-- PuBentoItem
+-- PuBentoItem
+-- PuBentoItem span=2
```

Best for:

```
dashboard overview
product or venue summaries
highlight + supporting facts
rich empty-state alternatives
analytics snapshots
```

Potential props:

```ts
PuBentoGrid.props = {
  as?: string;
  columns?: 2 | 3 | 4;
  gap?: PuGap;
  minItemHeight?: string;
  collapse?: "stack" | "grid";
}

PuBentoItem.props = {
  as?: string;
  span?: 1 | 2 | 3 | "full";
  rowSpan?: 1 | 2;
  tone?: PuSurfaceTone;
}
```

Priority:

```
high
```

Reason:

```
Bento is useful when the library has enough overview/dashboard surfaces.
It should reuse SurfaceCard semantics for each tile instead of inventing a new
card system.
```

First-slice API direction:

```ts
PuBentoGrid.props = {
  as?: string;                 // default "div"
  columns?: 2 | 3 | 4;          // default 2
  gap?: PuGap;                  // default "md"
  collapseAt?: PuBreakpoint;    // default "md"
  autoRows?: string;            // default "minmax(120px, auto)"
  dense?: boolean;              // default false
}

PuBentoItem.props = {
  as?: string;                  // default "section"
  title?: string;
  description?: string;
  span?: 1 | 2 | 3 | 4 | "full"; // default 1
  rowSpan?: 1 | 2 | 3;           // default 1
  tone?: PuSurfaceTone;          // default "section"
  density?: PuDensity;           // default "comfortable"
}
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

Span migration note:

```
mvp-HA span="full" maps to span="full".
mvp-HA default half-width maps to the default span=1 inside columns=2.
```

### 5. PuMediaObject

Purpose:

```
stable media + content composition with responsive stacking
```

ASCII:

```
PuMediaObject
+-- media
+-- content
|   +-- title/meta/body/actions
```

Best for:

```
profile snippets
venue cards
article/list teasers
product summary rows
```

Potential props:

```ts
props = {
  as?: string;
  mediaPosition?: "start" | "end" | "top";
  mediaSize?: "sm" | "md" | "lg";
  gap?: PuGap;
  align?: "start" | "center" | "stretch";
}
```

Priority:

```
medium
```

Reason:

```
It captures a repeated layout shape that cards and cells often approximate
with local CSS.
```

## Recommended Minimal Introduction

First batch:

```
PuBentoGrid / PuBentoItem
```

Second batch:

```
form layout component after API confirmation
PuSection if repeated section chrome remains after Bento migration
PuMediaObject if media/content rows repeat
```

## Bento Decision

Bento should exist when these conditions are true:

```
overview pages need asymmetric emphasis
items have heterogeneous importance
layout should remain responsive without per-page CSS
the tile content can be ordinary existing components
```

Bento should keep a small API:

```
grid owns columns/gap/responsive collapse
item owns span/rowSpan/tone
tile content remains user-provided
```

## Implementation Order

```
1. PuBentoGrid / PuBentoItem
2. form layout component after API confirmation
3. PuSection if still needed
4. PuMediaObject if still needed
```

## Design Guardrails

```
Use existing PuGap, PuDensity, PuSurfaceTone vocabularies.
Keep containers content-agnostic.
Keep semantic wrappers configurable through `as`.
Avoid card-in-card defaults.
Use slots for content rather than data schemas.
```

## Form Layout Direction

Current baseline:

```
PuForm exists as validation/error provider.
PuFormItem exists as field error wrapper.
mvp-HA form CSS repeats field rhythm, label tone, input width, helper/error rhythm.
```

Component decision:

```
Do not introduce a component for simple grid/flex form arrangement.
Use UnoCSS when layout is only columns/gap.
```

Potential component if needed:

```
PuFormLayout
+-- default slot containing PuFormItem / fields
+-- optional actions slot
```

Justification threshold:

```
label placement needs to switch between top/side
field spans need to be named and responsive
actions alignment repeats across admin forms
PuFormItem error/helper rhythm needs a shared layout wrapper
```

Potential props:

```ts
props = {
  as?: string;                   // default "div"
  columns?: 1 | 2 | 3;            // default 1
  gap?: PuGap;                    // default "md"
  density?: PuDensity;            // default "comfortable"
  labelPlacement?: "top" | "side"; // default "top"
  actionsAlign?: "start" | "end" | "stretch";
}
```

Potential companion:

```ts
PuFormLayoutItem.props = {
  as?: string;
  span?: 1 | 2 | 3 | "full";
}
```
