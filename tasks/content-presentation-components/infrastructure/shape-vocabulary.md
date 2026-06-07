# Shape Vocabulary

Status:

```
Design preference captured on 2026-05-17.
```

## Preference

The design system should use rounded corners conservatively.

Practical reading:

```
Default to square or low-radius component geometry.
Use radius as an intentional affordance for touch targets, overlays, pills,
avatars, and surfaces that need strong grouping.
Prefer tokenized radius values over component-local math.
Prefer selected-state color, border, typography, and spacing before elevation.
```

## Current Token Reading

```
sys-radius-none:    0px
sys-radius-xsmall:  0px
sys-radius-small:   0px
sys-radius-medium:  8px
sys-radius-large:   16px
sys-radius-pill:    999px
```

## Segmented Application

```
PuSegmented:
  rail radius: small
  item radius: small
  selected item shadow: removed
  selected state: color + border + text contrast
  rail and item use matching radius tokens for coherent selected geometry
```
