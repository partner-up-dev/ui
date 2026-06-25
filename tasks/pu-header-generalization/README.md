# PuHeader Generalization

## Status

- Mode: Execute
- Started: 2026-06-24
- Scope: `packages/web`

## Request

Promote the current page-owned header structure into a cleaner shared primitive:

- add public `PuHeader`
- keep action layout fixed to inline only
- do not restore historical `layout` variants
- apply `PuHeader` to `PuDialog` and `PuDrawer` default headers next
- remove `PuPageHeader` instead of keeping a compatibility wrapper
- let `PuPageScaffold` own page-header outer padding
- split `PuPageScaffold` standard page-header and raw custom header paths

## Working Contract

`PuHeader` owns:

- title and subtitle structure
- optional leading region
- right-aligned inline actions
- optional meta row
- neutral variant plus size and separator controls

Page scaffolds keep owning:

- standard `pageHeader` inset and safe-area treatment
- content-region inset rhythm

Custom header slots keep owning:

- raw custom header spacing and chrome

Overlay hosts keep owning:

- close behavior
- shell spacing rules
- dialog or drawer accessibility contract

## Initial Risks

- A generic header that still owns page-like padding would duplicate insets inside cards and panels.
- A generic header that keeps any default outer inset would keep forcing host overrides in overlays and cards.
- `PuDialog` needs stable `aria-labelledby` and `aria-describedby` ids even after header extraction.
- `PuDrawer` currently uses a looser custom header slot contract than `PuDialog`; the shared primitive must not narrow it accidentally.
- `PuPageScaffold` already owns the page-header landmark, so page use of `PuHeader`
  must not reintroduce nested `header` landmarks.
- `PuPageScaffold` must not infer ownership from slot child component type; a custom
  `header` slot that happens to render `PuHeader` is still consumer-owned.

## Planned Touch Surface

- `packages/web/src/components/puHeader/*`
- `packages/web/src/components/puPageHeader/*`
- `packages/web/src/components/puDialog/*`
- `packages/web/src/components/puDrawer/*`
- `packages/web/src/stories/layout/PuHeader.story.vue`
- `packages/web/src/stories/overlay/PuDialog.story.vue`
- `packages/web/src/stories/overlay/PuDrawer.story.vue`
- generated registry and skill references
