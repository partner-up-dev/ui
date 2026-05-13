# Skeleton Design Recommendation

Status:

```
Discussion draft on 2026-05-13.
Needs user confirmation before implementation.
```
## Product Read

Skeleton is an async content affordance, but its useful shape comes from content
layout. The component should help product screens preserve visual continuity
while data arrives.

The main risk is API sprawl. Mature libraries split between primitive bones and
large preset systems. design2 should start with the primitive path and document
composition examples before introducing a preset DSL.

## First Slice Recommendation

Implement:

```
PuSkeleton
```

Do this in one component first:

```
shape primitive
text rows
loading wrapper
animation enum
reduced-motion handling
accessibility opt-in for announcement
```

Defer:

```
PuSkeletonText
PuSkeletonAvatar
PuSkeletonCard
PuSkeletonPreset
type DSL such as "list-item-avatar-two-line@5"
runtime DOM measurement / auto skeleton
```

Reason:

```
The primitive covers MUI, Chakra, and Quasar's stable core.
Rows and row widths cover the most common Ant Design, Element Plus, and Vant
paragraph case.
Composition examples cover cards and lists without turning Skeleton into a
parallel layout framework.
```

## Design Principles

### Match Final Layout

Skeleton should reserve close to the final content geometry.

Practical rules:

```
Use text rows where final content is text.
Use circle for avatars and icon spots.
Use rounded or rect for media, charts, cards, and image slots.
Keep final card/list/table spacing in the parent layout.
Avoid skeletons whose height differs materially from the loaded view.
```

### Keep Animation Boring

Animation communicates pending state. It should not become a visual theme.

Recommended enum:

```
"pulse"
"wave"
"none"
```

Default:

```
pulse
```

Reason:

```
Pulse is cheap and quiet.
Wave is useful for prominent placeholders and marketing-like content cards.
None is needed for reduced motion, static mocks, and dense repeated lists.
```

### Keep Repeated Lists Quiet

For repeated list/table skeletons:

```
Use one accessible loading region.
Render repeated bones as aria-hidden.
Prefer animation="none" or pulse for dense repeated rows.
```

### Prefer Composition Before Presets

First stories should show composition patterns:

```
Text block
Media card
Avatar list row
Repeated list
Dashboard stat row
Loading wrapper around real content
```

If these patterns repeat heavily in product code, promote the top two into
named preset components later.

## Suggested Public API

```ts
type PuSkeletonVariant = "text" | "rect" | "rounded" | "circle";
type PuSkeletonAnimation = "pulse" | "wave" | "none";
type PuSkeletonGap = "xs" | "sm" | "md";

props = {
  as?: string;                       // default "span"
  loading?: boolean;                 // default true
  variant?: PuSkeletonVariant;       // default "text"
  animation?: PuSkeletonAnimation;   // default "pulse"
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  rows?: number;                     // default 1, only meaningful for text
  rowWidth?: string | number | Array<string | number>;
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

## Accessibility Recommendation

Default visual skeleton:

```html
<span class="pu-skeleton" aria-hidden="true"></span>
```

Announced loading region:

```html
<span
  class="pu-skeleton"
  role="status"
  aria-live="polite"
  aria-busy="true"
>
  <span class="pu-visually-hidden">Loading</span>
</span>
```

Guidance:

```
Keep announce=false by default.
Use announce=true only once per loading region.
Consumers can put aria-busy on a larger section when they own the region.
```

## Story Requirements

Minimum Histoire variants:

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

Coverage goal:

```
Show how to build real product loading states with composition, not presets.
```

## Verification Requirements

Commands:

```
pnpm --filter @partner-up-dev/design-web generate:check
pnpm --filter @partner-up-dev/design-web type-check
pnpm --filter @partner-up-dev/design-web build
pnpm --filter @partner-up-dev/design-web story:coverage
pnpm --filter @partner-up-dev/design-web story:build
```

Browser smoke:

```
Open PuSkeleton story.
Verify each variant renders the expected class modifiers.
Verify loading=false renders default slot content.
Verify announce=true renders role=status and aria-busy=true.
Verify animation="none" produces no animation class.
Verify no console errors.
```
