# PuChip / PuChipGroup

Status:

```
Implemented in packages/web on 2026-05-12.
Awaiting visual review and API refinement.
```

## Implementation Record

Source files:

```
packages/web/src/components/puChip/puChip.ts
packages/web/src/components/puChip/puChip.vue
packages/web/src/components/puChip/puChip.scss
packages/web/src/components/puChipGroup/puChipGroup.ts
packages/web/src/components/puChipGroup/puChipGroup.vue
packages/web/src/components/puChipGroup/puChipGroup.scss
```

Generated files:

```
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
```

Story:

```
packages/web/src/stories/display/PuChip.story.vue
```

Story coverage note:

```
PuChip.story.vue declares:
@pu-story-covers PuChip PuChipGroup
```

## Role

PuChip is the slot-first primitive for short metadata, statuses, preference
labels, and compact facts.

PuChipGroup provides spacing, alignment, and wrapping for groups of chips.

PuTag remains available for existing text-prop tag usage.

## Information Architecture

```
PuChipGroup
+-- PuChip
|   +-- optional prefix
|   +-- label / default slot
|   +-- optional suffix
|   +-- optional remove action
+-- PuChip
+-- PuChip
```

## DOM Target

Default chip:

```html
<span class="pu-chip pu-chip--tone-surface pu-chip--size-md">
  <span class="pu-chip__label">Open</span>
</span>
```

Removable chip:

```html
<span class="pu-chip is-removable">
  <span class="pu-chip__label">Removable</span>
  <button class="pu-chip__remove" type="button" aria-label="Remove">
    <span aria-hidden="true"></span>
  </button>
</span>
```

Button chip:

```html
<button
  class="pu-chip is-selected"
  type="button"
  aria-pressed="true"
>
  <span class="pu-chip__label">Selected</span>
</button>
```

ASCII structure:

```
PuChipGroup
+-- component.pu-chip-group
    +-- component.pu-chip
    |   +-- span.pu-chip__prefix
    |   +-- span.pu-chip__label
    |   +-- span.pu-chip__suffix
    |   +-- button.pu-chip__remove
    +-- component.pu-chip
```

## Public API

### PuChip

```ts
type PuChipTone =
  | "surface"
  | "outline"
  | "primary"
  | "secondary"
  | "tertiary"
  | "info"
  | "success"
  | "warning"
  | "error";

type PuChipSize = "sm" | "md" | "lg";
type PuChipType = "button" | "submit" | "reset";

props = {
  as?: string;              // default "span"
  type?: PuChipType;        // default "button", used when as="button"
  label?: string;
  tone?: PuChipTone;        // default "surface"
  size?: PuChipSize;        // default "md"
  selected?: boolean;       // default false
  disabled?: boolean;       // default false
  removable?: boolean;      // default false
  removeLabel?: string;     // default "Remove"
  prefixIcon?: string;
  suffixIcon?: string;
}
```

Slots:

```ts
default
prefix
suffix
remove-icon
```

Emits:

```ts
click(event: MouseEvent)
remove(event: MouseEvent)
```

### PuChipGroup

```ts
type PuChipGroupGap = "none" | "xs" | "sm" | "md" | "lg";
type PuChipGroupAlign = "start" | "center" | "end";

props = {
  as?: string;                 // default "div"
  gap?: PuChipGroupGap;        // default "sm"
  align?: PuChipGroupAlign;    // default "start"
  wrap?: boolean;              // default true
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

## Layout Notes

```
PuChipGroup
+-- display: flex
+-- optional wrap
+-- gap maps to shared spacing tokens
+-- align maps to justify-content

PuChip
+-- max-width: 100%
+-- label truncates with ellipsis
+-- removable action stays fixed-size
+-- selected state uses currentColor border
```

## Accessibility Notes

```
Default root is span for metadata.
as="button" gives native button behavior.
as="button" + selected emits aria-pressed="true".
disabled maps to disabled for button roots.
disabled maps to aria-disabled for non-button roots.
remove action is a real button with removeLabel.
```

## Verification

```
pnpm --filter @partner-up-dev/design-web type-check
pnpm --filter @partner-up-dev/design-web verify
```

Story variants:

```
Basic
Tones
Sizes
Group Layout
Slots And Actions
```
