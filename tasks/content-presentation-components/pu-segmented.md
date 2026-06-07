# PuSegmented / PuSegmentedItem

Status:

```
Design discussion started on 2026-05-17.
Implemented on 2026-05-17.
```

Naming:

```
Public component names:
  PuSegmented
  PuSegmentedItem

Use the standard spelling "Segmented" in source paths, exports, stories, docs,
and global component types.
```

## Purpose

PuSegmented is a compact single-choice control for a small set of peer options.
It should cover both:

```
view switching inside a page
mode switching inside a tool
status/filter switching in dense admin surfaces
```

The component is justified when it owns interaction semantics, keyboard support,
selected state, disabled state, density, and design-token-driven styling.
Simple flex/grid spacing with static buttons should remain application markup.

## Component Shape

Use a compound API:

```
PuSegmented v-model="view" semantics="tabs"
+-- PuSegmentedItem value="overview"
+-- PuSegmentedItem value="activity"
+-- PuSegmentedItem value="settings"
```

Reason:

```
The item component keeps icon/label/badge slots local to each option.
The parent component owns selection state, keyboard behavior, density, tone,
orientation, and semantic role.
```

Implemented files:

```
packages/web/src/components/puSegmented/context.ts
packages/web/src/components/puSegmented/puSegmented.ts
packages/web/src/components/puSegmented/puSegmented.vue
packages/web/src/components/puSegmented/puSegmented.scss
packages/web/src/components/puSegmentedItem/puSegmentedItem.ts
packages/web/src/components/puSegmentedItem/puSegmentedItem.vue
packages/web/src/components/puSegmentedItem/puSegmentedItem.scss
packages/web/src/stories/display/PuSegmented.story.vue
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
```

## Information Architecture

Default horizontal form/mode control:

```
PuSegmented
+-- group rail
    +-- PuSegmentedItem
    |   +-- interactive control
    |       +-- leading slot
    |       +-- label/default slot
    |       +-- trailing slot
    +-- PuSegmentedItem
    |   +-- interactive control
    |       +-- leading slot
    |       +-- label/default slot
    |       +-- trailing slot
    +-- PuSegmentedItem
        +-- interactive control
            +-- leading slot
            +-- label/default slot
            +-- trailing slot
```

Page view switching:

```
PageHeader or section toolbar
+-- PuSegmented semantics="tabs" v-model="activeView"
    +-- PuSegmentedItem value="overview" panelId="overview-panel"
    +-- PuSegmentedItem value="metrics" panelId="metrics-panel"
    +-- PuSegmentedItem value="history" panelId="history-panel"

Content area
+-- panel id="overview-panel"
+-- panel id="metrics-panel"
+-- panel id="history-panel"
```

## DOM Sketch

Radio semantics:

```
<div class="pu-segmented" role="radiogroup" aria-label="View">
  <button
    class="pu-segmented-item is-selected"
    type="button"
    role="radio"
    aria-checked="true"
    tabindex="0"
  >
    <span class="pu-segmented-item__leading"></span>
    <span class="pu-segmented-item__label">Overview</span>
    <span class="pu-segmented-item__trailing"></span>
  </button>
</div>
```

Tabs semantics:

```
<div class="pu-segmented" role="tablist" aria-label="View">
  <button
    class="pu-segmented-item is-selected"
    type="button"
    role="tab"
    aria-selected="true"
    aria-controls="overview-panel"
    tabindex="0"
  >
    <span class="pu-segmented-item__label">Overview</span>
  </button>
</div>
```

## Props

```ts
type PuSegmentedValue = string | number;
type PuSegmentedSemantics = "radio" | "tabs";
type PuSegmentedActivation = "automatic" | "manual";

interface PuSegmentedProps {
  modelValue?: PuSegmentedValue;
  semantics?: PuSegmentedSemantics;   // default "radio"
  activation?: PuSegmentedActivation; // default "automatic"
  disabled?: boolean;                 // default false
  orientation?: PuOrientation;         // default "horizontal"
  size?: PuSize;                       // default "md"
  density?: PuDensity;                 // default "comfortable"
  tone?: PuTone;                       // default "surface"
  fullWidth?: boolean;                 // default false
  equalWidth?: boolean;                // default false
  ariaLabel?: string;
  ariaLabelledby?: string;
}

interface PuSegmentedItemProps {
  value: PuSegmentedValue;
  label?: string;
  disabled?: boolean;       // default false
  panelId?: string;         // used by semantics="tabs"
}
```

## Emits

PuSegmented:

```ts
emit("update:modelValue", value: PuSegmentedValue)
emit("change", value: PuSegmentedValue)
```

PuSegmentedItem:

```
No public semantic emit in the first slice.
Native click listeners can be attached through attrs when needed.
```

## Slots

PuSegmented:

```
default
```

PuSegmentedItem:

```
default   label content
leading   icon or compact visual affordance
trailing  badge/count/secondary affordance
```

## Keyboard Behavior

```
ArrowRight / ArrowDown
  Move to next enabled item.

ArrowLeft / ArrowUp
  Move to previous enabled item.

Home
  Move to first enabled item.

End
  Move to last enabled item.

Space / Enter
  Select focused item.

activation="automatic"
  Arrow movement updates modelValue.

activation="manual"
  Arrow movement updates focus; Space/Enter updates modelValue.
```

## Visual Contract

```
Root:
  inline-flex rail
  tokenized padding, radius, gap, border/background
  small radius, matching item radius
  horizontal by default
  optional vertical orientation

Item:
  stable height from size + density
  small radius
  selected state with stronger surface, border, and text contrast
  disabled state with pointer and contrast treatment
  focus-visible ring
  icon/label/trailing alignment

fullWidth:
  root width: 100%

equalWidth:
  each item flex: 1 1 0
```

## First Story Coverage

```
Basic radio segmented
Page view switching with semantics="tabs"
Icons and counts through leading/trailing slots
Disabled item and disabled group
Compact density
Full-width equal-width toolbar
Keyboard smoke target
```

Implemented story:

```
packages/web/src/stories/display/PuSegmented.story.vue

@pu-story-covers PuSegmented PuSegmentedItem
```

## Verification

Local run on 2026-05-17:

```
pnpm --filter @partner-up-dev/design-web type-check
pnpm --filter @partner-up-dev/design-web build
pnpm --filter @partner-up-dev/design-web story:coverage
pnpm --filter @partner-up-dev/design-web story:build
```

Result:

```
Passed.

Story coverage:
39/46 public components have stories in the current workspace.
PuSegmented and PuSegmentedItem are covered by PuSegmented.story.vue.
```

Browser smoke:

```
Opened:
http://localhost:6006/story/src-stories-display-pusegmented-story-vue

Radio Control:
  Found one radiogroup labelled "Application status".
  Found four radio items.
  Clicked Approved.
  aria-checked became true.
  Disabled Archived item rendered disabled.
  Visible selected text updated to "Selected: approved".

Page View Tabs:
  Found one tablist labelled "Admin view".
  Found three tab items.
  Clicked Applications.
  aria-selected became true.
  aria-controls matched segmented-applications-panel.
  Matching panel content rendered.

Manual Keyboard Activation:
  ArrowRight from Table moved focus without changing selection.
  Enter on Chart selected Chart.
  Visible selected text updated to "Selected: chart".

Console:
  0 errors.
```

Visual tuning on 2026-05-17:

```
Removed selected item shadow.
Changed rail radius from large to medium.
Changed item radius to small.
Segmented selected state now relies on color, border, and text contrast.
```

Follow-up visual tuning on 2026-05-17:

```
Changed rail radius from medium to small.
Rail and item now share the same radius token to keep active state geometry
coherent.
```

## Open Decisions

```
1. Default semantics:
   Implemented default is "radio" because it fits mode/filter selection. Page
   view switching opts into semantics="tabs".

2. Routing:
   First slice emits state changes. Route integration stays in application code
   through update:modelValue handlers.

3. Indicator animation:
   First slice uses selected item styling. A sliding indicator can be added
   later if the CSS/measurement cost is justified.
```
