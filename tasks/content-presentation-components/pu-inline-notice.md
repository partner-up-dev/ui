# PuInlineNotice

Status:

```
Implemented in packages/web on 2026-05-13.
Awaiting visual review and API refinement.
```

## Implementation Record

Source files:

```
packages/web/src/components/puInlineNotice/puInlineNotice.ts
packages/web/src/components/puInlineNotice/puInlineNotice.vue
packages/web/src/components/puInlineNotice/puInlineNotice.scss
```

Generated files:

```
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
```

Story:

```
packages/web/src/stories/display/PuInlineNotice.story.vue
```

## Role

PuInlineNotice is the content-area message block for info, success, warning,
and error feedback inside a page section, card, form, or detail surface.

PuNoticeBar remains the announcement-strip component for scrolling or rotating
notices.

## Information Architecture

```
PuInlineNotice
+-- optional tone icon
+-- content
|   +-- optional title
|   +-- message / default slot
+-- optional actions
+-- optional close button
```

## DOM Target

Default:

```html
<div class="pu-inline-notice pu-inline-notice--tone-info" role="status">
  <span class="pu-inline-notice__icon" aria-hidden="true"></span>
  <div class="pu-inline-notice__content">
    <div class="pu-inline-notice__title">Draft saved</div>
    <div class="pu-inline-notice__message">Changes are stored.</div>
  </div>
</div>
```

Dismissible warning:

```html
<div class="pu-inline-notice pu-inline-notice--tone-warning" role="alert">
  <span class="pu-inline-notice__icon" aria-hidden="true"></span>
  <div class="pu-inline-notice__content">...</div>
  <button
    class="pu-inline-notice__close"
    type="button"
    aria-label="Dismiss notice"
  ></button>
</div>
```

ASCII structure:

```
component.pu-inline-notice
+-- span.pu-inline-notice__icon
+-- div.pu-inline-notice__content
|   +-- div.pu-inline-notice__title
|   +-- div.pu-inline-notice__message
+-- div.pu-inline-notice__actions
+-- button.pu-inline-notice__close
```

## Public API

```ts
type PuInlineNoticeTone = "info" | "success" | "warning" | "error";

props = {
  as?: string;                    // default "div"
  tone?: PuInlineNoticeTone;      // default "info"
  title?: string;
  message?: string;
  icon?: string;
  showIcon?: boolean;             // default true
  dismissible?: boolean;          // default false
  closeLabel?: string;            // default "Close"
}
```

Slots:

```ts
icon
title
default
actions
close-icon
```

Emits:

```ts
close(event: MouseEvent)
```

## Accessibility Notes

```
info and success use role="status".
warning and error use role="alert".
The icon is decorative by default through aria-hidden.
Dismissible notice uses a native button with closeLabel.
Closing hides the notice locally and emits close.
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
Dismissible
Slots And Actions
```
