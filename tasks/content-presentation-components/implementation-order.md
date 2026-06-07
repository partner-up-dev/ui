# Implementation Order

## Current Remaining Content Components

Status:

```
Updated after PuDescriptionList implementation on 2026-05-12.
```

Next minimum set:

```
1. PuPageHeader
2. PuChip
3. PuChipGroup
4. PuInlineNotice
5. PuEmptyState
```

Priority reasoning:

```
PuPageHeader
  Highest remaining content-layout primitive. PageScaffold owns geometry;
  PageHeader owns page meaning, title hierarchy, subtitle, meta, and top actions.

PuChip / PuChipGroup
  Highest remaining metadata primitive. Current PuTag is a simple visual tag;
  Chip should provide slot-first short labels, status/tone variants, and
  grouped spacing/alignment.

PuInlineNotice
  Highest remaining inline feedback primitive. PuAnnouncementBar is an
  announcement strip; InlineNotice should live inside content sections and carry
  status semantics.

PuEmptyState
  Completes repeated content states for empty lists, missing data, no search
  results, and first-run panels.
```

Deferred content-adjacent candidates:

```
PuChoiceCard
  Useful for selectable content surfaces. Implement after base presentation
  primitives because it mixes card layout, selection state, and form semantics.

PuSegmented / PuSegmentedItem
  Useful for compact single-choice mode switching and page view switching.
  First slice implemented on 2026-05-17.

PuFitChipGroup
  Depends on PuChip/PuChipGroup and adds measurement behavior with ResizeObserver.

PuAvatar
  Identity presentation primitive. Lower migration count and narrower surface.

PuLoadingState
  Valuable async feedback primitive. Better handled in the feedback slice with
  loading/error/empty states together.

PuSkeleton
  Valuable async content placeholder. Research completed on 2026-05-13.
  First slice implemented on 2026-05-13 as a primitive bone with text rows,
  loading wrapper, animation enum, and accessibility opt-in.
```

## Phase 1

Status:

```
Implemented on 2026-05-12.
```

Implement:

```
PuDescriptionList
PuDescriptionItem
```

Reason:

```
This is the strongest new abstraction. It fills the current gap between local
one-off fact markup and card-level PuSurfaceCard. It also creates a migration
target for facts-card style screens.
```

Verification:

```
pnpm --filter @partner-up-dev/design-web type-check
pnpm --filter @partner-up-dev/design-web build
```

Demo coverage:

```
stack layout
inline layout
grid layout
custom label slot
custom value slot
footer slot
```

Implemented story:

```
packages/web/src/stories/display/PuDescriptionList.story.vue
```

## Phase 2

Status:

```
Implemented on 2026-05-12.
```

Implement:

```
PuPageHeader
PuChip
PuChipGroup
```

Reason:

```
These cover page meaning and short metadata. They are high-frequency patterns in
mvp-HA and have low implementation risk.
```

Verification:

```
type-check
build
demo rendering
keyboard focus for header back action
```

Implemented story:

```
packages/web/src/stories/display/PuPageHeader.story.vue
packages/web/src/stories/display/PuChip.story.vue
```

## Phase 3

Status:

```
Implemented on 2026-05-13.
```

Implement:

```
PuInlineNotice
PuEmptyState
```

Reason:

```
These complete content states: message blocks and absent-content surfaces.
```

Verification:

```
role=status for info/success
role=alert for warning/error
close event from dismissible notice
empty state with actions slot
```

Implemented story:

```
packages/web/src/stories/display/PuInlineNotice.story.vue
packages/web/src/stories/display/PuEmptyState.story.vue
```

## Phase 4

Status:

```
Implemented on 2026-05-13.
```

Implement:

```
PuSkeleton
```

Reason:

```
This covers async content placeholders with a primitive-first API. It provides
text rows, basic shapes, animation choices, loading slot handoff, and an
accessibility announcement opt-in while keeping layout composition in consumer
markup.
```

Implemented story:

```
packages/web/src/stories/display/PuSkeleton.story.vue
```

## Phase 5

Status:

```
Implemented on 2026-05-17.
```

Implement:

```
PuSegmented
PuSegmentedItem
```

Reason:

```
This covers compact single-choice mode switching and page view switching with a
compound API. The parent owns state, semantics, variants, and keyboard behavior;
items own value, label, disabled state, and leading/trailing content slots.
```

Implemented story:

```
packages/web/src/stories/display/PuSegmented.story.vue
```

## Deferred

Candidates:

```
PuFitChipGroup
PuAvatar
PuLoadingState
PuChoiceCard
```

Reason:

```
They are valuable follow-ups. Each belongs to a more specific slice:
measurement-aware metadata, identity, async feedback, and selectable surfaces.
```
