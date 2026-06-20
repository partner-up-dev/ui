# PuPageHeader

Status:

```
Implemented in packages/web on 2026-05-12.
API refinement applied on 2026-06-19.
```

## Implementation Record

Source files:

```
packages/web/src/components/puPageHeader/puPageHeader.ts
packages/web/src/components/puPageHeader/puPageHeader.vue
packages/web/src/components/puPageHeader/puPageHeader.scss
```

Generated files:

```
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
```

Story:

```
packages/web/src/stories/display/PuPageHeader.story.vue
```

## Role

PuPageHeader is the content entry point for a page or major view.

Page scaffold components own page geometry. PuPageHeader owns page meaning:
title hierarchy, subtitle, back affordance, metadata, and top-level actions.

## Information Architecture

```
PuPageHeader
+-- main row
|   +-- optional back action
|   +-- copy
|   |   +-- title
|   |   +-- subtitle
|   +-- optional actions
+-- optional meta
+-- optional body
```

## DOM Target

Default:

```html
<header class="pu-page-header" aria-labelledby="pu-page-header-1-title">
  <div class="pu-page-header__main">
    <div class="pu-page-header__content">
      <h1 id="pu-page-header-1-title" class="pu-page-header__title">
        Events
      </h1>
      <p class="pu-page-header__subtitle">Manage upcoming gatherings.</p>
    </div>
  </div>
</header>
```

With back and actions:

```html
<header class="pu-page-header is-with-back is-with-actions">
  <div class="pu-page-header__main">
    <button class="pu-page-header__back" type="button" aria-label="Back">
      <span aria-hidden="true"></span>
    </button>
    <div class="pu-page-header__content">
      <h1 class="pu-page-header__title">Event detail</h1>
    </div>
    <div class="pu-page-header__actions">...</div>
  </div>
  <div class="pu-page-header__meta">...</div>
</header>
```

ASCII structure:

```
component.pu-page-header
+-- div.pu-page-header__main
|   +-- button.pu-page-header__back
|   +-- div.pu-page-header__content
|   |   +-- component.pu-page-header__title
|   |   +-- p.pu-page-header__subtitle
|   +-- div.pu-page-header__actions
+-- div.pu-page-header__meta
+-- div.pu-page-header__body
```

## Public API

```ts
type PuPageHeaderLayout = "inline" | "stack";
type PuPageHeaderSize = "sm" | "md" | "lg";
type PuPageHeaderVariant = "plain" | "soft" | "outline" | "solid";
type PuPageHeaderTitleAs = "h1" | "h2" | "h3" | "h4";

props = {
  as?: string;                         // default "header"
  title?: string;
  subtitle?: string;
  titleAs?: PuPageHeaderTitleAs;       // default "h1"
  showBack?: boolean;                  // default false
  backLabel?: string;                  // default "Back"
  layout?: PuPageHeaderLayout;         // default "inline"
  size?: PuPageHeaderSize;             // default "md"
  variant?: PuPageHeaderVariant;       // default "plain"
  bordered?: boolean;                  // default false
}
```

API notes:

```
size replaces density and reuses the shared PuSize vocabulary.
surfaceLevel was removed because a page header should not model page depth.
variant remains as the shared container treatment vocabulary.
bordered remains as a page separator affordance independent of variant.
```

Slots:

```ts
title
subtitle
back-icon
actions
meta
default
```

Emits:

```ts
back(event: MouseEvent)
```

## Accessibility Notes

```
The default root is header.
When title exists, the root gets aria-labelledby pointing to the rendered title.
titleAs controls heading level without changing visual scale.
Back control is a native button with an aria-label.
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
Sizes
Action Priority
Stack Layout
Meta And Body
Variants
```

## Layout Contract

```
inline
  back, title copy, and actions share one main row.
  Actions do not wrap onto a second row based on container width.
  Actions keep their natural width.
  Title and subtitle copy shrink first when horizontal space is tight.

stack
  back and title copy share the first row.
  Actions occupy an explicit second row.
```
