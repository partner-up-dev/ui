# PuEmptyState

Status:

```
Implemented in packages/web on 2026-05-13.
Awaiting visual review and API refinement.
```

## Implementation Record

Source files:

```
packages/web/src/components/puEmptyState/puEmptyState.ts
packages/web/src/components/puEmptyState/puEmptyState.vue
packages/web/src/components/puEmptyState/puEmptyState.scss
```

Generated files:

```
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
```

Story:

```
packages/web/src/stories/display/PuEmptyState.story.vue
```

## Role

PuEmptyState presents empty lists, missing data, no search results, and
first-run setup states with a stable icon, copy, body, and actions structure.

## Information Architecture

```
PuEmptyState
+-- optional icon
+-- content
|   +-- title
|   +-- optional description
|   +-- optional body
+-- optional actions
```

## DOM Target

Default:

```html
<section
  class="pu-empty-state pu-empty-state--tone-section"
  aria-labelledby="pu-empty-state-1-title"
  aria-describedby="pu-empty-state-1-description"
>
  <div class="pu-empty-state__icon" aria-hidden="true"></div>
  <div class="pu-empty-state__content">
    <h2 id="pu-empty-state-1-title" class="pu-empty-state__title">
      No events yet
    </h2>
    <p
      id="pu-empty-state-1-description"
      class="pu-empty-state__description"
    >
      Create your first event.
    </p>
  </div>
  <div class="pu-empty-state__actions">...</div>
</section>
```

ASCII structure:

```
component.pu-empty-state
+-- div.pu-empty-state__icon
+-- div.pu-empty-state__content
|   +-- h2.pu-empty-state__title
|   +-- p.pu-empty-state__description
|   +-- div.pu-empty-state__body
+-- div.pu-empty-state__actions
```

## Public API

```ts
type PuEmptyStateAlign = "start" | "center";
type PuEmptyStateTone =
  | "plain"
  | "surface"
  | "section"
  | "inset-high"
  | "outline";

props = {
  as?: string;                    // default "section"
  title?: string;
  description?: string;
  icon?: string;
  compact?: boolean;              // default false
  align?: PuEmptyStateAlign;      // default "center"
  tone?: PuEmptyStateTone;        // default "section"
}
```

Slots:

```ts
icon
title
description
default
actions
```

Emits:

```ts
(none)
```

## Accessibility Notes

```
The default root is section.
When title exists, root gets aria-labelledby pointing to title.
When description exists, root gets aria-describedby pointing to description.
Icon is decorative by default with aria-hidden.
Actions are caller-provided controls.
```

## Verification

```
pnpm --filter @partner-up-dev/design-web type-check
pnpm --filter @partner-up-dev/design-web verify
```

Story variants:

```
Basic
Search Results
First Run
Compact
```
