# Accessibility Composables

Status:

```
P0 implemented in packages/web.
Documentation/example infrastructure intentionally deferred after user scope change.
P1/P2 remain pending.
```

## Implementation Record

Implemented files:

```
packages/web/src/composables/index.ts
packages/web/src/composables/types.ts
packages/web/src/composables/usePuId.ts
packages/web/src/composables/useBodyScrollLock.ts
packages/web/src/composables/useEscapeKey.ts
packages/web/src/composables/useFocusReturn.ts
packages/web/src/composables/useFocusTrap.ts
packages/web/src/index.ts
```

Migrated components:

```
PuModal
+-- shared body scroll lock
+-- shared Escape handling
+-- shared focus return
+-- shared focus trap
+-- generated aria ids
+-- role="dialog" / aria-modal / labelledby-label path

PuDrawer
+-- shared body scroll lock
+-- shared Escape handling
+-- shared focus return
+-- shared focus trap
+-- generated aria ids
+-- dialog semantics while visible
+-- aria-hidden/inert while hidden
+-- labelled close button

PuAccordionItem
+-- shared generated ids
+-- trigger aria-controls
+-- content region aria-labelledby

PuWheelPicker
+-- shared generated ids for options and aria-activedescendant
```

Verification:

```
pnpm --filter @partner-up-dev/design-web generate:check
pnpm --filter @partner-up-dev/design-web type-check
pnpm --filter @partner-up-dev/design-web build
```

## Current Evidence

Current component-local accessibility logic is already diverging:

```
PuModal
+-- owns Escape listener
+-- owns body scroll lock
+-- lacks explicit dialog role / aria-modal / labelledby wiring
+-- lacks focus trap and focus return

PuDrawer
+-- owns body scroll lock separately
+-- close button has icon hidden from assistive tech but no explicit label
+-- lacks dialog semantics when used as modal drawer
+-- lacks Escape and focus trap

PuWheelPicker
+-- has listbox / option / active-descendant semantics
+-- owns a module-level id seed
+-- owns keyboard navigation locally

PuTabs
+-- has tablist / tab semantics
+-- lacks roving focus and arrow-key behavior
+-- lacks tabpanel relation ids

PuAccordionItem
+-- has aria-expanded
+-- generates random content id locally
+-- lacks aria-controls on trigger
+-- content id is not generated through a shared id primitive
```

## Goal

Move repeatable accessibility mechanics into small Vue composables so component
authors keep component-specific semantics while shared behavior stays consistent.

Layering:

```
PuModal / PuDrawer / PuTabs / PuAccordionItem / PuWheelPicker
        |
        v
accessibility composables
        |
        v
SSR-safe DOM adapters + small shared registries
```

## Principles

```
Native element first.
SSR-safe by default.
No document/window access before mounted watchers run.
No global state except documented registries such as scroll-lock and overlay stack.
Composable APIs accept refs/getters where component state is reactive.
Composable APIs return explicit bindings or small methods, not magic attrs.
```

## Proposed Source Shape

```
packages/web/src/composables/
+-- index.ts
+-- usePuId.ts
+-- useBodyScrollLock.ts
+-- useEscapeKey.ts
+-- useFocusTrap.ts
+-- useFocusReturn.ts
+-- useRovingFocus.ts
+-- useDisclosure.ts

packages/web/src/index.ts
+-- export * from './composables'
```

## P0 Slice

### usePuId

Purpose:

```
Generate stable component-local ids for aria-labelledby, aria-describedby,
aria-controls, aria-activedescendant, and option ids.
```

API target:

```ts
type MaybeRefOrGetter<T> = T | Ref<T> | (() => T)

export function usePuId(
  prefix?: string,
  explicitId?: MaybeRefOrGetter<string | undefined>
): ComputedRef<string>
```

Usage:

```ts
const baseId = usePuId('pu-modal', () => props.id)
const titleId = computed(() => `${baseId.value}-title`)
const bodyId = computed(() => `${baseId.value}-body`)
```

Notes:

```
Do not rely on Math.random.
Prefer component instance uid plus a local call counter.
Keep explicit id passthrough so consumers can provide stable externally known ids.
```

Immediate migrations:

```
PuAccordionItem content id
PuWheelPicker option ids
PuModal title/body ids
PuDrawer title/body ids
```

### useBodyScrollLock

Purpose:

```
Lock document/body scrolling for overlays without corrupting nested locks.
```

API target:

```ts
export function useBodyScrollLock(
  active: MaybeRefOrGetter<boolean>,
  options?: {
    target?: () => HTMLElement | undefined
    reserveScrollbarGap?: boolean
  }
): void
```

Implementation requirement:

```
Use a module-level lock stack/count.
Capture previous inline overflow and padding-right once.
Restore only when the last lock releases.
Cleanup on unmount.
```

Immediate migrations:

```
PuModal
PuDrawer
future bottom drawer / picker panels
```

### useEscapeKey

Purpose:

```
Centralize Escape handling and cleanup.
```

API target:

```ts
export function useEscapeKey(
  active: MaybeRefOrGetter<boolean>,
  handler: (event: KeyboardEvent) => void,
  options?: {
    target?: () => Document | Window | HTMLElement | undefined
    capture?: boolean
    preventDefault?: boolean
    stopPropagation?: boolean
  }
): void
```

Implementation requirement:

```
Ignore non-Escape keys.
Ignore composing keyboard events.
Avoid listener leaks when active changes.
```

Immediate migrations:

```
PuModal
PuDrawer
future picker/dialog components
```

### useFocusReturn

Purpose:

```
Remember the element focused before an overlay opens and restore focus after it closes.
```

API target:

```ts
export function useFocusReturn(
  active: MaybeRefOrGetter<boolean>,
  options?: {
    enabled?: MaybeRefOrGetter<boolean>
    restoreTarget?: () => HTMLElement | null | undefined
  }
): void
```

Immediate migrations:

```
PuModal
PuDrawer
future ConfirmDialog
```

### useFocusTrap

Purpose:

```
Keep keyboard focus inside modal overlays while they are open.
```

API target:

```ts
export function useFocusTrap(
  container: Ref<HTMLElement | null>,
  active: MaybeRefOrGetter<boolean>,
  options?: {
    initialFocus?: 'first' | 'container' | (() => HTMLElement | null)
    restoreFocus?: boolean
  }
): {
  focusFirst: () => void
}
```

Implementation requirement:

```
Find tabbable descendants with a conservative selector.
On Tab/Shift+Tab, loop inside the container.
If no tabbable descendants exist, focus the container itself.
Require tabindex="-1" on the container when container focus is possible.
Cleanup listeners on close/unmount.
```

Decision note:

```
Focus traps are easy to get subtly wrong. First in-house implementation should
cover the library's modal/drawer use cases only. If nested overlays, shadow DOM,
or complex portals become common, switch this composable to wrap a proven focus
trap dependency behind the same API.
```

Immediate migrations:

```
PuModal
PuDrawer
future ConfirmDialog
```

## P1 Slice

### useRovingFocus

Purpose:

```
Share arrow-key focus movement for tablists, segmented controls, chip groups,
menus, and list-like composites.
```

API target:

```ts
export function useRovingFocus(options: {
  count: MaybeRefOrGetter<number>
  activeIndex: MaybeRefOrGetter<number>
  disabled?: MaybeRefOrGetter<ReadonlySet<number> | boolean[]>
  orientation?: MaybeRefOrGetter<'horizontal' | 'vertical' | 'both'>
  loop?: MaybeRefOrGetter<boolean>
  activation?: MaybeRefOrGetter<'manual' | 'automatic'>
  onMove: (index: number, event: KeyboardEvent) => void
  onActivate?: (index: number, event: KeyboardEvent) => void
}): {
  getTabIndex: (index: number) => 0 | -1
  onKeydown: (event: KeyboardEvent) => void
}
```

Immediate migrations:

```
PuTabs
future PuChipGroup when selectable
future menu/listbox-like components
```

### useDisclosure

Purpose:

```
Normalize open/closed state, trigger ids, content ids, and disclosure bindings.
```

API target:

```ts
export function useDisclosure(options: {
  open: MaybeRefOrGetter<boolean>
  disabled?: MaybeRefOrGetter<boolean>
  baseId?: MaybeRefOrGetter<string>
}): {
  triggerId: ComputedRef<string>
  contentId: ComputedRef<string>
  triggerAttrs: ComputedRef<{
    id: string
    'aria-expanded': boolean
    'aria-controls': string
  }>
  contentAttrs: ComputedRef<{
    id: string
  }>
}
```

Immediate migrations:

```
PuAccordionItem
PuExpandableCard
future collapsible content blocks
```

## P2 Slice

Candidates:

```
useOverlayStack
  Ensures only the topmost overlay responds to Escape and outside click.

useInertSiblings
  Applies inert/aria-hidden to background roots for modal overlays.

useLiveRegion
  Provides stable polite/assertive announcement regions for dynamic feedback.
```

Reason for deferral:

```
These add more global coordination and need stronger tests. The first pass can
deliver immediate consistency with ids, scroll lock, Escape, focus return, focus
trap, and roving focus.
```

## Component Migration Map

```
PuModal
+-- usePuId
+-- useBodyScrollLock
+-- useEscapeKey
+-- useFocusReturn
+-- useFocusTrap
+-- role="dialog"
+-- aria-modal="true"
+-- aria-labelledby when title exists

PuDrawer
+-- useBodyScrollLock
+-- useEscapeKey
+-- useFocusReturn
+-- useFocusTrap when modal
+-- aria-label on close button

PuAccordionItem
+-- usePuId
+-- useDisclosure
+-- aria-controls on trigger

PuTabs
+-- usePuId
+-- useRovingFocus
+-- tab/tabpanel id relations when panel ownership is added

PuWheelPicker
+-- usePuId
+-- keep component-local listbox behavior for now
```

## Verification

Minimum manual checklist per migrated component:

```
Tab reaches the expected first focus target.
Shift+Tab does not escape an open modal/dialog.
Escape closes only the intended overlay.
Focus returns to the opener after close.
Screen-reader names are provided for icon-only controls.
aria-expanded / aria-controls / aria-labelledby ids resolve to real elements.
Nested scroll locks restore body styles correctly.
```

Future automated checks:

```
Vue Test Utils for composable cleanup and emitted close/change events.
Playwright keyboard tests against Histoire stories.
axe checks against story routes.
```
