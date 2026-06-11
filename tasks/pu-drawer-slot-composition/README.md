# PuDrawer Slot Composition

## State

Explore / Solidify.

## Request

Rework the web package `PuDrawer` so it supports richer overlay shell
composition, then migrate web `PuPicker` to reuse that drawer shell instead of
owning a duplicate bottom-sheet overlay.

This task is scoped to `@partner-up-dev/design-web`. The UniApp package keeps
its native `<picker>` implementation unless a separate platform-specific need
appears.

## Scope

- `packages/web/src/components/puDrawer/`
- `packages/web/src/components/puPicker/`
- `packages/web/src/stories/overlay/PuDrawer.story.vue`
- `packages/web/src/stories/forms/PuPicker.story.vue`
- `packages/web/skill.seed.json`
- generated registry, global component types, and design-web skill references
  when the public API or docs change

Out of scope:

- `packages/uniapp/`
- A generic `PuPanel` extraction unless Drawer and Modal changes prove that it
  removes real duplication in this slice.
- Backward-compatible shims for unpublished API mistakes unless current stories
  or local package consumers require them.

## Current Findings

- Web `PuPicker` currently owns its own `Teleport`, overlay, bottom panel,
  dialog role, cancel close, and z-index styling.
- Web `PuDrawer` already owns body scroll lock, Escape handling, focus return,
  focus trap, dialog aria wiring, and visible state emission.
- Web `PuDrawer` does not currently use `Teleport`, while `PuModal` and
  `PuPicker` do.
- Web `PuDrawer` exposes `fullCustom` plus a `full` slot. This works, but the
  name hides the actual contract: disable the default drawer chrome and let the
  consumer provide the whole interior.
- Current `PuDrawer` z-index values are much lower than `PuPicker` overlay
  values, so a direct Picker migration could regress stacking.
- `PuDrawer` close events do not expose close reason. `PuPicker` needs to map
  scrim / Escape / cancel button closes into its `cancel` behavior while keeping
  confirm separate.

## Design Claims

- `PuDrawer` should be the web package's bottom overlay shell for workflows
  that slide over the page, including picker-like selection panels.
- `PuPicker` should own selection state, draft state, formatting, confirmation,
  and field trigger behavior. It should not own generic overlay mechanics.
- `fullCustom` should be replaced or softened by named slot composition. The
  preferred contract is explicit content IA rather than a boolean that switches
  between two unrelated render modes.
- `PuDrawer` should support default structured usage and low-level composition
  without forcing consumers to duplicate accessibility behavior.
- The first implementation should be conservative: improve Drawer enough to
  support Picker, then let future Modal/Drawer duplication decide whether
  `PuPanel` is warranted.

## Target IA

```text
PuDrawer
+-- overlay / scrim
+-- panel
    +-- header slot or title/close default
    +-- body/default slot
    +-- footer slot
```

Picker composition target:

```text
PuPicker
+-- field trigger
+-- PuDrawer
    +-- header/toolbar
    |   +-- cancel action
    |   +-- confirm action
    +-- picker columns
```

## Proposed API Direction

Candidate Drawer props:

```ts
visible: boolean;
title?: string;
ariaLabel?: string;
height?: string;
maxWidth?: string;
teleport?: boolean | string; // default true or "body"
closeOnOverlay?: boolean;
closeOnEscape?: boolean;
lockScroll?: boolean;
showClose?: boolean;
```

Candidate Drawer slots:

```ts
header;
title;
close;
default;
footer;
```

Candidate close event shape:

```ts
type PuDrawerCloseReason = "overlay" | "escape" | "close-button" | "programmatic";

emits = {
  "update:visible": boolean;
  close: { reason: PuDrawerCloseReason };
}
```

Compatibility note:

```text
If keeping current `close: () => true` is simpler for the first slice, close
reason can be delayed. Picker can still treat all Drawer close events as cancel
except when confirm owns the state transition. Do not add reason payload unless
the implementation uses it immediately or stories show the value.
```

## Implementation Slices

1. Solidify the Drawer shell contract.
   - Decide whether `visible` remains the control prop or whether Drawer aligns
     to Modal's `open` prop.
   - Decide whether `fullCustom` is deprecated immediately or kept as an alias
     while named slots are introduced.
   - Decide z-index policy using tokens or a local overlay scale.
   - Decide Teleport default and opt-out behavior.

2. Enhance `PuDrawer`.
   - Add structured slots for `header`, `title`, `close`, `default`, and
     `footer`.
   - Add or align `closeOnOverlay`.
   - Add `Teleport` if it does not break open-state story review.
   - Preserve scroll lock, Escape, focus return, focus trap, aria label/id
     behavior.
   - Keep default drawer usage concise for ordinary filter/detail workflows.

3. Migrate web `PuPicker`.
   - Replace Picker-owned overlay and panel shell with `PuDrawer` composition.
   - Keep Picker draft index, column change, confirm, cancel, clear, and exposed
     `open` / `close` behavior.
   - Ensure cancel paths do not emit confirm/change.
   - Ensure confirm closes the drawer after model update.

4. Update stories and generated docs.
   - Add Drawer story variants for default header, custom header/footer, and
     Picker-like composition.
   - Keep Picker stories covering single column, multi-column, clearable,
     custom trigger, and before-confirm behavior.
   - Update `skill.seed.json` if public slots/props/events change.
   - Regenerate registry/types/skill references as needed.

5. Verify.
   - `pnpm --filter @partner-up-dev/design-web run generate`
   - `pnpm --filter @partner-up-dev/design-web run skill:generate`
   - `pnpm --filter @partner-up-dev/design-web run type-check`
   - `pnpm --filter @partner-up-dev/design-web run story:coverage`
   - `pnpm --filter @partner-up-dev/design-web run build`
   - `pnpm --filter @partner-up-dev/design-web run story:build`

## Open Questions

- Should `PuDrawer` keep `visible/update:visible` for continuity, or align with
  `PuModal`'s `open/close` API before the package is published?
- Should `PuDrawer` default to `Teleport to="body"` like `PuModal`, or expose
  Teleport as opt-in to avoid surprising story layout changes?
- Should `fullCustom` be removed, renamed to `bare`, or kept as a deprecated
  alias behind richer named slots?
- Should close reason payloads be part of the first implementation, or delayed
  until another consumer besides Picker needs reason-specific behavior?
- Should overlay z-index be formalized as a shared token before Drawer/Picker
  migration, or can this slice use a local Drawer value and promote later?

## Non-Goals

- Do not change UniApp `PuPicker`.
- Do not introduce `PuPanel` unless this task proves Drawer cannot support
  composition cleanly without it.
- Do not add a changeset for task-packet-only edits.

## Implementation Record

Started on 2026-06-11.

Implemented decisions:

- Kept `visible` / `update:visible` as the Drawer control API for this slice.
- Added named Drawer composition slots for `header`, `title`, `close`, default
  body, and `footer`.
- Kept `fullCustom` as a compatibility escape hatch, but moved stories and
  generated guidance toward named slots.
- Added Drawer `Teleport`, `maxWidth`, `zIndex`, `showClose`,
  `closeOnOverlay`, and `contentPadding` support.
- Added Drawer close reason payloads for overlay, Escape, and close-button
  paths.
- Migrated web `PuPicker` to compose `PuDrawer` for its overlay shell while
  keeping Picker-owned draft selection, confirmation, cancellation, and trigger
  behavior.
- Added `.changeset/compose-picker-with-drawer.md` because the slice changes
  public web package API and runtime behavior.
