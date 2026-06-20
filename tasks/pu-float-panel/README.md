# PuFloatPanel Task Packet

Date: 2026-06-20

## State

Execute. First implementation completed on 2026-06-20.

## Request

Add a web `PuFloatPanel` component for a bottom-attached floating panel whose
vertical position is controlled by dragging a short flat handle at the top.

The panel should support multiple snap stops. The standard layout position is
absolute positioning with `bottom: 0`.

## Scope

- `packages/web/src/components/puFloatPanel/`
- `packages/web/src/stories/overlay/PuFloatPanel.story.vue`
- `packages/web/skill.seed.json`
- generated registry, global component types, and design-web skill references
  after component generation

Out of scope:

- `packages/uniapp/`
- `PuDrawer` behavior changes
- modal overlay, scrim, body scroll lock, focus trap, or Teleport behavior
- CSS length / percentage stop values in the first slice

## Decisions

- Build `PuFloatPanel` as a new component instead of extending `PuDrawer`.
  `PuDrawer` owns overlay/dialog behavior; this component is a persistent,
  non-modal bottom panel.
- Do not include a mask/scrim.
- Keep the panel bottom attached with `position: absolute; bottom: 0`.
- Use height to express position. Dragging upward increases panel height, so
  the panel bottom remains attached and no visual gap appears.
- Do not use `transform + bottom filler` as the first implementation model.
- Make the drag handle the only drag target. The content area should keep
  normal scrolling behavior.
- First-slice stops use numeric pixel heights.

## Design Claims

- The public model should represent the active stop, not a raw pixel value.
- Stop values should be discrete and controlled by `modelValue`, matching web
  component contract guidance for selection-like controls.
- The stop height is the whole panel height, including the handle area.
- Drag movement can be continuous during interaction, but commit should happen
  only after snapping to a stop.
- Keyboard behavior matters because the handle is an interactive position
  control, not just a visual affordance.

## Target IA

```text
PuFloatPanel
+-- root, absolute/fixed bottom anchor
    +-- handle control
    |   +-- visual handle bar
    +-- content region
        +-- default slot
```

## Proposed API

```ts
type PuFloatPanelValue = string | number;

type PuFloatPanelStop = {
  value: PuFloatPanelValue;
  label: string;
  height: number;
  disabled?: boolean;
};
```

Candidate props:

```ts
modelValue: PuFloatPanelValue;
stops: readonly PuFloatPanelStop[];
position?: "absolute" | "fixed"; // default "absolute"
disabled?: boolean;
ariaLabel?: string;
ariaLabelledby?: string;
handleLabel?: string;
contentPadding?: boolean;
zIndex?: string | number;
```

Candidate emits:

```ts
"update:modelValue": (value: PuFloatPanelValue) => true;
change: (value: PuFloatPanelValue, stop: PuFloatPanelStop, index: number) => true;
dragStart: (payload: PuFloatPanelDragPayload) => true;
drag: (payload: PuFloatPanelDragPayload) => true;
dragEnd: (payload: PuFloatPanelDragEndPayload) => true;
```

Implementation note: the first slice kept only `update:modelValue` and `change`.
Live drag telemetry was not added because no concrete consumer needs it yet.

Candidate slots:

```ts
default;
handle;
```

The first implementation can skip the `handle` slot if the default handle is
enough for the package story surface.

## Interaction Model

```text
pointerdown on handle
+-- record startY and startHeight
+-- capture pointer

pointermove
+-- nextHeight = startHeight - deltaY
+-- clamp to min/max enabled stop height
+-- apply height directly for live feedback

pointerup / pointercancel
+-- optionally project by velocity
+-- resolve nearest enabled stop
+-- animate height to stop height
+-- emit update:modelValue and change when committed stop changes
```

Keyboard model:

```text
ArrowUp     -> next higher stop
ArrowDown   -> next lower stop
Home        -> lowest stop
End         -> highest stop
```

Accessibility target:

```text
handle role="slider"
aria-valuemin="0"
aria-valuemax="stops.length - 1"
aria-valuenow="activeIndex"
aria-valuetext="activeStop.label"
aria-disabled when disabled
```

## Implementation Slices

1. Implement component source.
   - Add `puFloatPanel.ts`, `.vue`, and `.scss`.
   - Keep root absolute bottom positioning by default.
   - Drive panel height with a CSS variable or inline style derived from live
     height.
   - Use pointer capture and primary-pointer filtering similar to
     `PuWheelPicker`.

2. Add Histoire coverage.
   - Basic three-stop panel.
   - Tall/content-scroll example.
   - Disabled or controlled-state example.

3. Update public docs and generation inputs.
   - Add `PuFloatPanel` to `skill.seed.json`.
   - Run component registry generation.
   - Run skill generation after public docs are updated.

4. Verify.
   - `pnpm --filter @partner-up-dev/design-web run generate`
   - `pnpm --filter @partner-up-dev/design-web run skill:generate`
   - `pnpm --filter @partner-up-dev/design-web run type-check`
   - `pnpm --filter @partner-up-dev/design-web run story:coverage`
   - `pnpm --filter @partner-up-dev/design-web run build`
   - `pnpm --filter @partner-up-dev/design-web run story:build`

## Open Questions

- Should the first public name be `PuFloatPanel` or `PuFloatingPanel`? Current
  request chooses `PuFloatPanel`.
- Should `position="fixed"` be included in the first API, or should consumers
  place the absolute panel inside their own fixed container?
- Should `dragStart` / `drag` / `dragEnd` be public in the first slice, or keep
  only `update:modelValue` and `change` until a concrete consumer needs live
  telemetry?
- Should a `handle` slot be exposed immediately, or should the default handle
  remain the only supported affordance for consistency?
- Should invalid `modelValue` fall back to the first stop or the lowest-height
  stop?

## Non-Goals

- Do not add a changeset for task-packet-only edits.
- Do not introduce overlay behavior.
- Do not retrofit `PuDrawer` to use this component in the first slice.
- Do not support proportional stops until there is a concrete consumer need.

## Implementation Record

Implemented:

```text
packages/web/src/components/puFloatPanel/puFloatPanel.ts
packages/web/src/components/puFloatPanel/puFloatPanel.vue
packages/web/src/components/puFloatPanel/puFloatPanel.scss
packages/web/src/stories/overlay/PuFloatPanel.story.vue
.changeset/pu-float-panel.md
```

Updated:

```text
packages/web/skill.seed.json
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
packages/web/skills/design-web/references/component-map.md
packages/web/skills/design-web/references/usage-rules.md
packages/web/skills/design-web/references/components/PuFloatPanel.md
```

Implemented decisions:

- Public component name is `PuFloatPanel`.
- Stops are sorted by numeric height for movement and snapping.
- `change` emits the original `stops` index, not the sorted index.
- Root position supports `absolute` by default and optional `fixed`.
- The handle uses slider semantics and supports ArrowUp, ArrowDown, Home, and
  End.
- The default slot and optional handle slot receive the active stop, original
  index, live height, and dragging state.
- No mask, no Teleport, no body scroll lock, and no focus trap were added.

Verification:

```text
pnpm --filter @partner-up-dev/design-web run generate
pnpm --filter @partner-up-dev/design-web run skill:generate
pnpm --filter @partner-up-dev/design-web run type-check
pnpm --filter @partner-up-dev/design-web run story:coverage
pnpm --filter @partner-up-dev/design-web run build
pnpm --filter @partner-up-dev/design-web run check:packed-types
pnpm --filter @partner-up-dev/design-web run skill:validate
pnpm --filter @partner-up-dev/design-web run story:build
```

Result:

- Passed generated registry and skill freshness checks.
- Passed Vue type-check.
- Passed story coverage with `50/50` public components covered.
- Passed package build.
- Passed packed consumer type check.
- Passed skill validation.
- Passed Histoire build with `42` stories and `208` variants.
