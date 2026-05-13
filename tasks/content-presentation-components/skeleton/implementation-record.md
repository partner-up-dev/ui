# PuSkeleton Implementation Record

Status:

```
Implemented in packages/web on 2026-05-13.
Awaiting visual review and API refinement.
```

## Source Files

```
packages/web/src/components/puSkeleton/puSkeleton.ts
packages/web/src/components/puSkeleton/puSkeleton.vue
packages/web/src/components/puSkeleton/puSkeleton.scss
```

Generated files:

```
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
```

Story:

```
packages/web/src/stories/display/PuSkeleton.story.vue
```

## Implemented Scope

```
single primitive component
text, rect, rounded, circle variants
pulse, wave, none animations
text rows with per-row widths
loading wrapper with default slot handoff
announce opt-in with role=status and aria-busy
prefers-reduced-motion animation shutdown
```

## Information Architecture

Single bone:

```
PuSkeleton
+-- visual bone
```

Text rows:

```
PuSkeleton
+-- status text when announce=true
+-- row
+-- row
+-- row
```

Loading wrapper:

```
PuSkeleton loading=true
+-- skeleton placeholder

PuSkeleton loading=false
+-- default slot content
```

## DOM Target

Default text skeleton:

```html
<span
  class="pu-skeleton pu-skeleton--variant-text pu-skeleton--animation-pulse pu-skeleton--gap-sm"
  aria-hidden="true"
>
  <span class="pu-skeleton__row" aria-hidden="true"></span>
</span>
```

Rounded bone:

```html
<span
  class="pu-skeleton pu-skeleton--variant-rounded pu-skeleton--animation-pulse pu-skeleton--gap-sm"
  aria-hidden="true"
  style="width: 160px; height: 48px;"
></span>
```

Announced loading:

```html
<span
  class="pu-skeleton pu-skeleton--variant-text pu-skeleton--animation-pulse pu-skeleton--gap-sm is-announced"
  role="status"
  aria-live="polite"
  aria-busy="true"
>
  <span class="pu-skeleton__status">Loading</span>
  <span class="pu-skeleton__row" aria-hidden="true"></span>
</span>
```

## Public API

```ts
type PuSkeletonVariant = "text" | "rect" | "rounded" | "circle";
type PuSkeletonAnimation = "pulse" | "wave" | "none";
type PuSkeletonGap = "xs" | "sm" | "md";
type PuSkeletonDimension = string | number;
type PuSkeletonRowWidth = PuSkeletonDimension | PuSkeletonDimension[];

props = {
  as?: string;                       // default "span"
  loading?: boolean;                 // default true
  variant?: PuSkeletonVariant;       // default "text"
  animation?: PuSkeletonAnimation;   // default "pulse"
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  rows?: number;                     // default 1
  rowWidth?: PuSkeletonRowWidth;
  gap?: PuSkeletonGap;               // default "sm"
  block?: boolean;                   // default false
  announce?: boolean;                // default false
  loadingText?: string;              // default "Loading"
}
```

Slots:

```ts
default
```

Emits:

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
.pu-skeleton__status
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

## Story Variants

```
Basic Shapes
Text Rows
Animations
Composed Card
Repeated List
Loading Wrapper
Accessibility
Reduced Motion Note
```

## Verification

Commands:

```
pnpm --filter @partner-up-dev/design-web verify
```

Result:

```
Passed on 2026-05-13.
Story coverage reports 13/39 public components covered.
Histoire built 11 stories and 47 variants.
```

Browser smoke:

```
Basic Shapes: verified text, rect, rounded, circle modifiers.
Text Rows: verified 4 rendered rows and block state.
Animations: verified pulse, wave, and none classes.
Loading Wrapper: verified loading skeleton and loading=false default slot content.
Accessibility: verified role=status, aria-live=polite, aria-busy=true, and status text.
Console errors: none.
```
