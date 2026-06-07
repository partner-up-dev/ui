# Content Container Roadmap

Status:

```
Discussion note on 2026-05-24.
No implementation started.
```

## Baseline Inventory

Existing content containers and layout-related components:

```
Surface:
  PuSurfaceCard
  PuExpandableCard
  PuBentoItem
  PuCellGroup
  PuDescriptionList

Content organization:
  PuPageHeader
  PuCell / PuCellGroup
  PuDescriptionList / PuDescriptionItem
  PuAccordion / PuAccordionItem
  PuTabs / PuTab
  PuSegmented / PuSegmentedItem

Layout:
  PuBentoGrid / PuBentoItem
  PuPageScaffold

Overlay containers:
  PuModal
  PuDrawer

State containers:
  PuEmptyState
  PuSkeleton
  PuFileUpload
```

## Promotion Rule

Keep the existing rule:

```
If a layout can be expressed by four or fewer stable UnoCSS utility classes,
prefer utilities over a component.
```

A new container is justified when it owns one or more of these:

```
semantic DOM
accessible state or keyboard behavior
named content IA slots
shared responsive policy
surface/tone/density/shape vocabulary
scroll or sticky behavior
per-child layout metadata
```

## Highest-Value Gaps

### 1. PuSection

Purpose:

```
semantic content section below PuPageHeader
owns section title, description, actions, body, footer, dividers, tone, density
```

IA:

```
PuSection
+-- header
|   +-- heading
|   |   +-- title
|   |   +-- description
|   +-- actions
+-- body
+-- footer
```

Why it matters:

```
PuSurfaceCard owns only surface and spacing.
PuCellGroup, PuDescriptionList, PuBentoItem each repeat header/title/action
patterns.
PuSection gives ordinary admin/content pages a reusable semantic block.
```

Likely first API:

```ts
props = {
  as?: string;          // default "section"
  title?: string;
  description?: string;
  tone?: PuSurfaceTone; // default "plain"
  density?: PuDensity;  // default "comfortable"
  dividers?: boolean;
}

slots = {
  header;
  title;
  description;
  actions;
  default;
  footer;
}
```

Priority:

```
highest
```

### 2. Card Family Cleanup

Current state:

```
PuSurfaceCard:
  low-level surface primitive
  props: as, tone, gap
  no density vocabulary
  no title/actions/footer IA

PuExpandableCard:
  disclosure card
  hardcoded section root
  hardcoded title/subtitle layout
  local large radius
  uncontrolled defaultExpanded only

PuBentoItem:
  structured tile card inside bento grid
```

Recommended direction:

```
PuSurfaceCard remains the low-level surface primitive.
Structured section/card IA belongs to PuSection or a future PuCard.
Selection behavior belongs to PuChoiceCard.
Disclosure behavior belongs to PuExpandableCard.
```

Useful PuSurfaceCard improvements:

```ts
props = {
  density?: PuDensity;
  padding?: PuGap | "none";
  radius?: "none" | "sm" | "md"; // align with shape vocabulary
  border?: boolean;              // optional explicit outline control
}
```

Useful PuExpandableCard improvements:

```ts
props = {
  modelValue?: boolean;
  defaultExpanded?: boolean;
  tone?: PuSurfaceTone;
  density?: PuDensity;
  disabled?: boolean;
  unmountOnCollapse?: boolean;
}

emits = {
  "update:modelValue";
  change;
}

slots = {
  header;
  title;
  description;
  actions;
  icon;
  default;
  footer;
}
```

Priority:

```
high
```

### 3. PuChoiceCard

Purpose:

```
selectable card surface for radio/checkbox-like decisions
```

IA:

```
PuChoiceCard
+-- indicator
+-- content
|   +-- title
|   +-- description
|   +-- meta/default slot
+-- trailing
```

Why it matters:

```
It owns selected/disabled semantics, keyboard behavior, aria-checked, and focus
ring. This exceeds the four-utility threshold.
```

Priority:

```
high when selectable content cards appear in mvp-HA migration
```

### 4. PuToolbar / PuFilterBar

Purpose:

```
compact action/filter row for admin content surfaces
```

IA:

```
PuToolbar
+-- leading
+-- title/label
+-- default controls
+-- actions
```

Justification threshold:

```
wrap behavior
overflow behavior
sticky behavior
consistent density
slot IA across page sections and cards
```

Priority:

```
medium-high for Admin pages
```

### 5. PuPanel

Purpose:

```
header/body/footer shell with scroll policy for drawers, modals, side panels,
and admin inspector panes
```

IA:

```
PuPanel
+-- header
+-- body scroll region
+-- footer/actions
```

Why it matters:

```
Modal and Drawer often repeat panel structure. A shared panel primitive can
standardize sticky header/footer, body overflow, density, and safe-area padding.
```

Priority:

```
medium
```

### 6. PuMediaObject

Purpose:

```
stable media + content composition with responsive stacking
```

IA:

```
PuMediaObject
+-- media
+-- content
|   +-- title
|   +-- meta/body/actions
```

Best for:

```
profile snippets
venue/event summary cards
article teasers
product/object summary rows
```

Priority:

```
medium
```

### 7. PuSplitView

Purpose:

```
responsive master-detail layout for admin pages
```

IA:

```
PuSplitView
+-- primary/list
+-- detail
```

Justification threshold:

```
desktop two-pane policy
mobile stacked/detail navigation policy
resizable or sticky pane behavior
```

Priority:

```
medium-low until repeated admin usage is confirmed
```

## Existing Component Enhancement Map

```
PuSurfaceCard:
  add density/padding/radius vocabulary
  keep as surface primitive

PuExpandableCard:
  add v-model, tone, density, slots, disabled, unmount policy
  align radius with shape vocabulary

PuBentoGrid / PuBentoItem:
  consider min column width / auto-fit policy
  consider per-breakpoint span later
  keep first slice small for predictable admin layouts

PuCellGroup:
  consider actions slot in header
  consider empty slot/state
  consider list semantics when cells are repeated navigational items

PuDescriptionList:
  consider actions slot in header
  consider collapsible sections through composition with PuExpandableCard

PuPageScaffold:
  owns page viewport, width, content placement, aside layout, and footer reveal
  replaces the previous scaffold variant family with orthogonal props

PuModal / PuDrawer:
  consider extracting shared PuPanel structure
```

## Recommendation

Next design discussion order:

```
1. PuSection
2. Card family cleanup: PuSurfaceCard + PuExpandableCard
3. PuChoiceCard if selectable cards are needed soon
4. PuToolbar if Admin list/filter pages repeat action rows
5. PuPanel if Modal/Drawer/Admin inspector structure starts duplicating
```

Generic layout primitives:

```
PuStack:
  priority low under the four-utility rule

PuGrid:
  priority low because PuBentoGrid covers the high-value asymmetric case
```
