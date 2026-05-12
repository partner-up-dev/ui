# Minimum Content Presentation Component Set

## Snapshot

Existing web components already cover these areas:

```
layout shells      -> PuPageScaffold*
surfaces           -> PuSurfaceCard, PuExpandableCard
single facts       -> PuCell, PuInfoRow
basic notice strip -> PuNoticeBar
simple tag         -> PuTag
```

The remaining minimum gap is:

```
page content entry
grouped facts
short labels and statuses
inline messages
empty content states
```

## Local Evidence

mvp-HA approximate usage counts:

```
PageHeader      30
Chip            23
InlineNotice    17
EmptyState       9
SurfaceCard     22
InfoRow          7
Cell             2
ExpandableCard   6
```

Interpretation:

```
PageHeader, Chip, InlineNotice, and EmptyState are repeated content presentation
patterns in mvp-HA. DescriptionList is inferred from repeated InfoRow groups and
facts-card patterns.
```

## Recommended Components

### 1. PuPageHeader

Problem:

```
Pages need a stable content entry: title, subtitle, metadata, and top actions.
Scaffolds define page geometry, while headers define page meaning.
```

Minimum shape:

```
PuPageHeader
+-- top row
|   +-- optional back action
|   +-- title
|   +-- top-actions slot
+-- optional subtitle
+-- optional meta slot
```

Initial API:

```
title: string
subtitle?: string
showBack?: boolean = false
backLabel?: string

emits:
back()

slots:
top-actions
meta
```

Implementation note:

```
Keep router and i18n outside the component. The component emits back and lets the
consumer decide navigation.
```

### 2. PuDescriptionList / PuDescriptionItem

Status:

```
Implemented on 2026-05-12.
```

Problem:

```
Many product screens show grouped name-value facts. PuInfoRow handles one fact.
DescriptionList turns a fact group into a semantic, scan-friendly unit.
```

Minimum shape:

```
PuDescriptionList
+-- optional header
+-- dl body
    +-- PuDescriptionItem*
```

Initial API summary:

```
List:
title?: string
description?: string
layout?: "stack" | "inline" | "grid"
density?: "compact" | "comfortable"
tone?: "plain" | "surface" | "outline"
dividers?: boolean
columns?: 1 | 2
labelWidth?: string
collapseOnMobile?: boolean
emptyText?: string

Item:
label?: string
value?: string | number | null
hint?: string
span?: 1 | 2
valueAlign?: "start" | "center" | "end"
emptyText?: string
```

### 3. PuChip / PuChipGroup

Problem:

```
Short labels, statuses, and preference tags need slot-based content and clear
tone/size variants. Existing PuTag is text-prop oriented.
```

Minimum shape:

```
PuChipGroup
+-- PuChip*
```

Initial API:

```
PuChip:
as?: string = "span"
tone?: "secondary" | "primary" | "surface" | "outline" | "danger" | "warning"
size?: "sm" | "md" | "lg"

PuChipGroup:
as?: string = "div"
gap?: "xs" | "sm" | "md"
align?: "start" | "center" | "end"
```

Deferred enhancement:

```
PuFitChipGroup can follow after the base chip group lands. It requires
ResizeObserver and measurement state.
```

### 4. PuInlineNotice

Problem:

```
Content screens need inline status, warning, success, and error messages. A
notice bar is better for announcement strips; inline notice is better inside a
section or card.
```

Minimum shape:

```
PuInlineNotice
+-- tone icon
+-- content
|   +-- optional title
|   +-- optional message
|   +-- default slot
+-- optional close button
```

Initial API:

```
tone?: "info" | "success" | "warning" | "error"
title?: string
message?: string
dismissible?: boolean
closeLabel?: string

emits:
close()
```

Accessibility:

```
role="status" for info and success
role="alert" for warning and error
```

### 5. PuEmptyState

Problem:

```
Empty lists, missing data, no search results, and first-run screens need a
shared presentation pattern: icon, title, explanation, and actions.
```

Minimum shape:

```
PuEmptyState
+-- optional icon
+-- copy
|   +-- title
|   +-- optional description
|   +-- optional body slot
+-- optional actions slot
```

Initial API:

```
as?: string = "section"
title: string
description?: string
icon?: string
compact?: boolean
align?: "start" | "center"
tone?: "section" | "outline"
```
