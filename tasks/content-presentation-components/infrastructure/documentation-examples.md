# Documentation And Example Infrastructure

Status:

```
Discussion proposal on 2026-05-12.
Histoire first slice implemented through verification-matrix.md.
Story contract docs and per-component notes remain pending.
```

## Current Evidence

Current docs/demo surfaces:

```
packages/web/docs/component-contract.md
packages/web/src/demo/App.vue
packages/web/src/demo/main.ts
packages/web/index.html
```

Observed issue:

```
src/demo/App.vue is a single growing surface.
It is useful for smoke testing but weak for scanable docs, state coverage,
keyboard testing, and per-component examples.
```

Related packet decisions:

```
verification-matrix.md
+-- Histoire is the catalog and visual fixture layer
+-- Playwright owns behavior, keyboard, focus, and accessibility assertions

verification-histoire-role.md
+-- story files live outside src/components
+-- first stories cover Button, Cell, ToggleSwitch, WheelPicker, Modal
```

Implemented first slice:

```
packages/web/histoire.config.ts
packages/web/src/stories/actions/PuButton.story.vue
packages/web/src/stories/display/PuCell.story.vue
packages/web/src/stories/forms/PuToggleSwitch.story.vue
packages/web/src/stories/forms/PuWheelPicker.story.vue
packages/web/src/stories/overlay/PuModal.story.vue
packages/web/scripts/check-story-coverage.mjs
```

Implemented Phase B slice:

```
packages/web/src/stories/display/PuPageHeader.story.vue
packages/web/src/stories/display/PuDescriptionList.story.vue
packages/web/src/stories/display/PuChip.story.vue
check-story-coverage supports @pu-story-covers for child components covered by parent stories
```

## Goal

Create a documentation and example system that is:

```
dev-only
Histoire-native
routeable for QA and screenshots
structured enough for coverage audits
small enough to maintain without generated prop docs in the first pass
```

## Proposed Source Shape

Use Histoire stories as canonical examples:

```
packages/web/
+-- histoire.config.ts
+-- src/
    +-- stories/
        +-- actions/
        |   +-- PuButton.story.vue
        +-- display/
        |   +-- PuCell.story.vue
        |   +-- PuDescriptionList.story.vue
        +-- forms/
        |   +-- PuToggleSwitch.story.vue
        |   +-- PuWheelPicker.story.vue
        +-- overlay/
        |   +-- PuModal.story.vue
        +-- _shared/
            +-- story-data.ts
            +-- story-layouts.vue
+-- docs/
    +-- component-contract.md
    +-- story-contract.md
    +-- component-notes/
        +-- pu-modal.md
        +-- pu-description-list.md
```

Keep `src/demo` small:

```
packages/web/src/demo/
+-- App.vue
+-- main.ts
```

Role of `src/demo`:

```
manual install smoke surface
quick local sanity page
not the canonical documentation catalog
```

Reason:

```
The package files list includes src/components, src/styles, src/utils, and types.
Stories under src/stories are not packaged. Histoire can still scan them.
```

## Story Contract

Each public component story should provide:

```
title
category
canonical variants
state coverage
slot examples where relevant
responsive preview where relevant
notes for accessibility-sensitive behavior
```

Target story outline:

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  open: false
})
</script>

<template>
  <Story title="Overlay/PuModal">
    <Variant title="Basic">
      <PuButton text="Open modal" @click="state.open = true" />
      <PuModal :open="state.open" title="Modal" @close="state.open = false">
        Content
      </PuModal>
    </Variant>

    <Variant title="Long content">
      <!-- canonical overflow state -->
    </Variant>

    <Variant title="Accessibility">
      <!-- keyboard/focus fixture for Playwright -->
    </Variant>
  </Story>
</template>
```

## Minimum Cases

Every public component should eventually have:

```
basic
  The smallest realistic usage.

variants
  Public tone/size/density/layout/status values where applicable.

states
  disabled/loading/error/empty/open/selected where applicable.

slots
  Slot-heavy or customized content where the component supports slots.

a11y
  Keyboard and aria-relation scenario for interactive components.

responsive
  Only when layout changes by viewport.
```

Not every component needs every case:

```
PuSurfaceCard:
  basic, variants, slots

PuModal:
  basic, states, a11y

PuDescriptionList:
  basic, variants, slots, responsive

PuTabs:
  basic, states, a11y
```

## Scripts

Implemented scripts:

```json
{
  "story:dev": "histoire dev",
  "story:build": "histoire build",
  "story:coverage": "node scripts/check-story-coverage.mjs"
}
```

Verification integration:

```json
{
  "verify": "pnpm run type-check && pnpm run build && pnpm run story:coverage && pnpm run story:build"
}
```

Implemented dependencies:

```
histoire 0.17.17
@histoire/plugin-vue 0.17.17
@histoire/controls 0.17.17
```

Add visual tooling later:

```
lost-pixel
```

## Coverage Check

Later script:

```
packages/web/scripts/check-story-coverage.mjs
```

Inputs:

```
src/component-registry.ts
src/stories/**/*.story.vue
```

Checks:

```
Every public Pu* component has a story or is explicitly ignored.
Every story references an existing public component.
Each interactive component has at least one accessibility fixture variant.
```

Suggested ignored set at first:

```
nested helper components such as PuAccordionItem when parent story covers them
low-level visual leaf components when covered by a parent story
```

The audit should be advisory at first:

```
pnpm run story:coverage
```

It can become a PR gate after the first story pass covers the migrated core set.

## Playwright And Axe Integration

Stories become test fixtures:

```
Histoire story route
        |
        v
Playwright opens a specific story/variant
        |
        v
keyboard, focus, controlled-state, and axe assertions
```

Target tests:

```
PuModal
+-- Tab loops inside dialog
+-- Shift+Tab loops backward
+-- Escape closes
+-- focus returns to opener
+-- aria-labelledby resolves

PuWheelPicker
+-- Arrow keys update selected option
+-- disabled options are skipped
+-- aria-activedescendant points to active option

PuTabs
+-- Arrow keys move focus
+-- Enter/Space activates in manual mode if supported
+-- selected tab exposes aria-selected
```

## Initial Implementation Order

Phase A:

```
Add Histoire config.
Add story:dev and story:build scripts.
Add first stories for PuButton, PuCell, PuToggleSwitch, PuWheelPicker, PuModal.
Keep src/demo as install smoke.
Run story:build with existing type-check/build gates.
```

Status:

```
Completed on 2026-05-12 through verification-matrix.md.
```

Reason:

```
This mirrors verification-histoire-role.md and immediately gives visual and
manual review coverage for high-risk primitives.
```

Phase B:

```
Add PuDescriptionList story when the component lands.
Add story-contract.md.
Add story coverage checker in advisory mode.
```

Reason:

```
Content presentation components need examples for density, layout, slots, and
long text. The coverage checker prevents newly exported components from silently
missing documentation.
```

Phase C:

```
Add Playwright tests against selected Histoire stories.
Add axe checks for overlays/forms/navigation-like components.
Add Lost Pixel visual regression after story structure stabilizes.
```

Reason:

```
Histoire is the fixture and catalog. Playwright proves behavior. Visual
regression should wait until canonical stories are stable enough to avoid noisy
baselines.
```

## Non-Goals For First Pass

```
Do not generate prop tables from TypeScript yet.
Do not require every legacy component to be fully documented before Histoire lands.
Do not put stories inside src/components while package files include src/components.
Do not use the demo App.vue as the canonical story source.
```

Reason:

```
The project currently needs durable examples and verification fixtures more than
a full documentation extraction system.
```
