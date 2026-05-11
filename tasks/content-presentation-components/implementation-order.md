# Implementation Order

## Phase 1

Implement:

```
PuDescriptionList
PuDescriptionItem
```

Reason:

```
This is the strongest new abstraction. It fills the current gap between
single-row PuInfoRow and card-level PuSurfaceCard. It also creates a migration
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

## Phase 2

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

## Phase 3

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

