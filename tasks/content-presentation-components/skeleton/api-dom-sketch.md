# PuSkeleton API And DOM Sketch

Status:

```
Draft on 2026-05-13.
Implementation pending explicit start.
```
## Information Architecture

Single bone:

```
PuSkeleton
+-- visual bone
```

Text rows:

```
PuSkeleton rows=3
+-- row 1
+-- row 2
+-- row 3
```

Loading wrapper:

```
PuSkeleton loading=true
+-- visual placeholder

PuSkeleton loading=false
+-- default slot content
```

Composed card:

```
card layout owned by consumer
+-- PuSkeleton variant=rounded image area
+-- PuSkeleton rows=2 text area
+-- actions row
    +-- PuSkeleton variant=rounded button area
```

Repeated list:

```
list layout owned by consumer
+-- row
|   +-- PuSkeleton variant=circle avatar
|   +-- PuSkeleton rows=2 text
+-- row
|   +-- PuSkeleton variant=circle avatar
|   +-- PuSkeleton rows=2 text
```

## DOM Target

Single bone:

```html
<span
  class="pu-skeleton pu-skeleton--variant-rounded pu-skeleton--animation-pulse"
  aria-hidden="true"
  style="width: 160px; height: 40px;"
></span>
```

Text rows:

```html
<span
  class="pu-skeleton pu-skeleton--variant-text pu-skeleton--animation-pulse pu-skeleton--gap-sm"
  aria-hidden="true"
>
  <span class="pu-skeleton__row" style="width: 100%;"></span>
  <span class="pu-skeleton__row" style="width: 92%;"></span>
  <span class="pu-skeleton__row" style="width: 64%;"></span>
</span>
```

Announced loading:

```html
<span
  class="pu-skeleton pu-skeleton--variant-text pu-skeleton--animation-pulse"
  role="status"
  aria-live="polite"
  aria-busy="true"
>
  <span class="pu-visually-hidden">Loading</span>
  <span class="pu-skeleton__row"></span>
</span>
```

## ASCII DOM

```
component.pu-skeleton
+-- span.pu-visually-hidden
+-- span.pu-skeleton__row
+-- span.pu-skeleton__row
+-- span.pu-skeleton__row
```

## Props

```ts
as?: string
loading?: boolean
variant?: "text" | "rect" | "rounded" | "circle"
animation?: "pulse" | "wave" | "none"
width?: string | number
height?: string | number
radius?: string | number
rows?: number
rowWidth?: string | number | Array<string | number>
gap?: "xs" | "sm" | "md"
block?: boolean
announce?: boolean
loadingText?: string
```

## Slots

```ts
default
```

## Emits

```ts
(none)
```

## CSS Contract

Block:

```css
.pu-skeleton
```

Elements:

```css
.pu-skeleton__row
```

Modifiers:

```css
.pu-skeleton--variant-text
.pu-skeleton--variant-rect
.pu-skeleton--variant-rounded
.pu-skeleton--variant-circle
.pu-skeleton--animation-pulse
.pu-skeleton--animation-wave
.pu-skeleton--animation-none
.pu-skeleton--gap-xs
.pu-skeleton--gap-sm
.pu-skeleton--gap-md
```

States:

```css
.is-block
.is-announced
```

Reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .pu-skeleton {
    animation: none;
  }

  .pu-skeleton::after {
    animation: none;
  }
}
```
