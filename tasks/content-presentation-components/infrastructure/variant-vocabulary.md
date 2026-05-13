# Variant Vocabulary

Status:

```
Implemented initial shared vocabulary in packages/web/src/types/variants.ts.
Added runtime helpers in packages/web/src/utils/variants.ts.
Exported both from packages/web/src/index.ts.
```

## Problem

Current component APIs use several local naming patterns:

```
theme: PrimaryContainer | Surface | SurfaceOutlined
tone: section | outline | surface | primary | secondary | tertiary
size: Small | Medium | Large
size: small | medium | large
gap: xs | sm | md | lg
layout: inline | stack
align: start | end
```

This creates API entropy as the library grows.

## Decision

New public APIs should start from shared variants:

```
PuTone
PuStatusTone
PuSurfaceTone
PuSize
PuExtendedSize
PuDensity
PuAlign
PuLayout
PuGap
PuBreakpoint
PuOrientation
```

Canonical values:

```
PuTone:
  surface | outline | primary | secondary | tertiary

PuStatusTone:
  info | success | warning | error

PuSurfaceTone:
  plain | surface | section | inset-high | outline

PuSize:
  sm | md | lg

PuExtendedSize:
  xs | sm | md | lg | xl

PuDensity:
  compact | comfortable

PuAlign:
  start | center | end

PuLayout:
  stack | inline | grid

PuGap:
  none | xs | sm | md | lg

PuBreakpoint:
  sm | md | lg | xl | 2xl

PuOrientation:
  horizontal | vertical
```

## Runtime Helpers

Implemented helpers:

```
isPuVariantValue(values, value)
normalizePuVariant(values, value, fallback)
createPuModifierClass(block, modifier, value)
createPuStateClass(state, active)
createPuPartClass(block, part)
```

Primary use:

```ts
createPuModifierClass("pu-description-list", "layout", props.layout)
createPuStateClass("disabled", props.disabled)
```

## Migration Policy

New components:

```
Use shared variant types by default.
Use lowercase kebab-compatible public values.
Use tone instead of theme.
Use size values sm/md/lg for new APIs.
```

Existing components:

```
Keep compatibility until a dedicated migration pass.
Normalize internally if a component needs to support legacy values.
```

## Immediate Consumer

PuDescriptionList should use:

```
PuLayout
PuDensity
PuSurfaceTone
PuAlign
PuGap
```

PuChip should use:

```
PuStatusTone where status is semantic
PuTone where tone is visual
PuSize
```

PuInlineNotice should use:

```
PuStatusTone
```

## Breakpoint Vocabulary

Added on 2026-05-13 as a prerequisite for PuBentoGrid:

```
packages/web/src/types/variants.ts
+-- puBreakpoints
+-- PuBreakpoint
+-- puBreakpointValues

packages/web/src/styles/_mixins.scss
+-- $breakpoints
+-- breakpoint($size)
+-- breakpoint-down($size)

packages/web/src/styles/unocss-preset.ts
+-- theme.breakpoints
```

Public values:

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```
