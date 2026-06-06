# Verification Matrix

Goal:

```
Catch broken token references, visible typography regressions, and UnoCSS drift
after the one-shot migration.
```

## Static Checks

Required:

```
Search for old typography token names:
display-large
headline-large
headline-medium
headline-small
title-large
title-medium
title-small
body-large
body-medium
body-small
label-large
label-medium
label-small

Search for undefined spacing:
--sys-spacing-xxsmall

Search for direct old variable reads:
--sys-typo-label-
--sys-typo-title-
--sys-typo-body-
--sys-typo-headline-
--sys-typo-display-
```

Expected result:

```
No old token names remain in component or story authoring code after one-shot
migration.
No temporary compatibility shim for old typography token names.
```

## Build Checks

Required:

```
package typecheck
package build
storybook/histoire build if configured locally
```

Exact commands:

```
pnpm --filter @partner-up-dev/design-web run type-check
pnpm --filter @partner-up-dev/design-web run build
pnpm --filter @partner-up-dev/design-web run story:coverage
pnpm --filter @partner-up-dev/design-web run story:build
pnpm --filter @partner-up-dev/design-web run skill:validate
```

Last run:

```
2026-06-06
All commands passed.
story:coverage reported the existing 38/45 coverage state and missing scaffold
backlog.
```

## Visual Smoke Targets

Minimum component targets:

```
PuButton
PuInput
PuTag
PuChip
PuSegmented
PuPageHeader
PuEmptyState
PuFileUpload
PuWheelPicker
PuTab
```

What to inspect:

```
text hierarchy remains obvious
control labels do not overflow
touch/control heights remain reasonable
iconfont spans align visually with text
spacing is not compressed by missing variables
dark/light color token behavior still works
```

## Responsive Checks

Viewports:

```
375 x 812
768 x 1024
1280 x 720
1440 x 900
```

Scenarios:

```
default root font size
browser zoom 125%
browser zoom 150%
dark mode
```

## Regression Rule

```
The migration should not change numeric prop semantics. Numeric width/height
props remain CSS px unless separately redesigned.
```
