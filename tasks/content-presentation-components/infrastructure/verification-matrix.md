# Verification Matrix

Status:

```
Discussion draft on 2026-05-12.
First slice implemented on 2026-05-12.
```

## Implementation Record

Implemented files:

```
packages/web/histoire.config.ts
packages/web/scripts/check-story-coverage.mjs
packages/web/src/stories/histoire.d.ts
packages/web/src/stories/histoire.setup.ts
packages/web/src/stories/story.css
packages/web/src/stories/actions/PuButton.story.vue
packages/web/src/stories/display/PuCell.story.vue
packages/web/src/stories/display/PuCellGroup.story.vue
packages/web/src/stories/display/PuChip.story.vue
packages/web/src/stories/display/PuDescriptionList.story.vue
packages/web/src/stories/display/PuEmptyState.story.vue
packages/web/src/stories/display/PuInlineNotice.story.vue
packages/web/src/stories/display/PuPageHeader.story.vue
packages/web/src/stories/display/PuSegmented.story.vue
packages/web/src/stories/display/PuSkeleton.story.vue
packages/web/src/stories/forms/PuToggleSwitch.story.vue
packages/web/src/stories/forms/PuWheelPicker.story.vue
packages/web/src/stories/overlay/PuModal.story.vue
```

Package scripts:

```json
{
  "story:dev": "histoire dev",
  "story:build": "histoire build",
  "story:coverage": "node scripts/check-story-coverage.mjs",
  "verify": "pnpm run type-check && pnpm run build && pnpm run story:coverage && pnpm run story:build"
}
```

Dependency decision:

```
Histoire 0.17.17 is used because it supports Vite 5.
Histoire 1.0.0-beta.1 currently expects Vite 7 and Vue 3.5.26.
```

Build boundary:

```
tsconfig.build.json excludes src/stories from declaration emission.
.gitignore excludes .histoire build output.
```

## Goal

The web package needs a verification system that proves different classes of
library risk with the smallest stable set of tools.

Verification should answer:

```
1. Is the public API exported and typed correctly?
2. Does the package build and publish with all required artifacts?
3. Do components behave correctly under pointer, keyboard, and controlled state?
4. Do overlay and form components meet accessibility expectations?
5. Do visual states, density, tone, size, and responsive layouts stay stable?
6. Are examples and docs complete enough for consumers and maintainers?
```

## Current Baseline

Existing gates:

```
pnpm --filter @partner-up-dev/design-web generate:check
pnpm --filter @partner-up-dev/design-web type-check
pnpm --filter @partner-up-dev/design-web build
```

Current coverage:

```
API drift:       partial
Type contract:  partial
Build output:   covered
Behavior:       manual
Accessibility:  manual
Visual states:  Histoire first slice
Docs/examples:  Histoire first slice
Consumer smoke: temporary ad hoc check
```

## Matrix

```
+----------------------+-----------------------------+-----------------------------+---------------------------+
| Risk                 | Evidence                    | Tool                        | Gate                      |
+----------------------+-----------------------------+-----------------------------+---------------------------+
| Generated drift      | generated files are fresh   | generate:check              | every PR                  |
| Public TS contract   | package entry type-checks   | vue-tsc                     | every PR                  |
| Consumer globals     | consumer fixture compiles   | vue-tsc fixture             | every PR or release       |
| Build artifact       | dist JS/CSS/d.ts emits      | vite build + vue-tsc emit   | every PR                  |
| Publish artifact     | packed package installs     | pnpm pack fixture           | release                   |
| Story coverage       | every Pu* has story         | registry story audit        | advisory first, then PR   |
| Visual states        | stable story screenshots    | Histoire + Lost Pixel/Percy | touched components/release|
| Pointer behavior     | clicks and state changes    | Playwright                  | critical components       |
| Keyboard behavior    | focus, escape, arrows, tab  | Playwright                  | critical components       |
| Accessibility        | roles, names, axe scan      | Playwright + axe            | overlays/forms/release    |
| Responsive layout    | viewport-specific rendering | Histoire/Playwright shots   | release/nightly           |
+----------------------+-----------------------------+-----------------------------+---------------------------+
```

## Recommended Tool Roles

### Type And Build

```
generate:check
+-- proves generated registry and GlobalComponents declarations are current

vue-tsc
+-- proves package source and declarations compile

vite build + declaration emit
+-- proves library output can be emitted
```

### Histoire

Primary role:

```
interactive component catalog
canonical story fixtures
visual regression input
manual responsive review surface
documentation pages
```

Best coverage:

```
variant grids
states across tone, density, size, disabled, loading, error
slot examples
responsive examples
copyable usage examples
```

### Playwright

Primary role:

```
behavior assertions
keyboard and focus assertions
accessibility scans
package consumer smoke where browser rendering matters
```

Best coverage:

```
PuModal escape and focus behavior
PuDrawer open and close behavior
PuTabs keyboard navigation
PuAccordion expand and collapse
PuWheelPicker pointer and keyboard selection
PuToggleSwitch v-model and disabled state
```

### Vitest / Vue Test Utils

Primary role:

```
small component logic tests
composable tests
emits and v-model contract tests where DOM layout is irrelevant
```

Decision:

```
Add after Histoire and Playwright if low-level logic grows.
For the current package, browser-level evidence is more valuable than shallow
component mount tests.
```

## Minimum First Slice

Implement in this order:

```
1. Add Histoire with story:dev and story:build scripts.
2. Add a first story set for Button, Cell, Modal, ToggleSwitch, WheelPicker.
3. Add a story coverage audit driven by src/component-registry.ts.
4. Add Playwright smoke tests for Modal, ToggleSwitch, WheelPicker.
5. Add consumer type fixture that imports @partner-up-dev/design-web.
6. Add visual regression after story structure stabilizes.
```

First CI command shape:

```json
{
  "verify": "pnpm run type-check && pnpm run build && pnpm run story:coverage && pnpm run story:build"
}
```

Implemented first slice:

```
PuButton        4 variants
PuCell          4 variants
PuCellGroup     5 variants
PuChip          covers PuChipGroup through one parent story
PuDescriptionList covers PuDescriptionItem through one parent story
PuEmptyState    4 variants
PuInlineNotice  4 variants
PuPageHeader    5 variants
PuSegmented     covers PuSegmentedItem through one parent story
PuSkeleton      8 variants
PuToggleSwitch 3 variants
PuWheelPicker  4 variants
PuModal         3 variants
```

Story coverage audit:

```
Current gate requires the first-slice components above.
Newly landed composite stories can use @pu-story-covers to count covered child components.
Strict mode can be enabled later to require every generated Pu* component.
```

Verification run:

```
pnpm --filter @partner-up-dev/design-web verify
```

Result:

```
Passed.
Story coverage reports 14/40 public components covered for committed story files.
Histoire built 12 committed stories and 52 variants.
Browser smoke opened http://localhost:6100 and rendered PuButton/Themes.
Browser smoke opened PuCell Button Root and verified compact title typography,
horizontal padding, button root, and no console errors.
Browser smoke opened PuCellGroup Surface Dividers/Header Footer/Compact Inset
variants and verified grouped cell DOM, header ARIA, divider rendering,
density class, and no console errors.
Browser smoke opened PuDescriptionList Stack/Grid variants and found dl/dt/dd DOM.
Browser smoke opened PuChip Basic/Actions variants, verified group/chip DOM,
remove behavior, aria-pressed selected button state, and no console errors.
Browser smoke opened PuPageHeader Basic/Back variants, verified header/title/
subtitle DOM, aria-labelledby, back event, actions, and no console errors.
Browser smoke opened PuInlineNotice Basic/Tones/Dismissible variants, verified
status/alert role mapping, dismiss behavior, and no console errors.
Browser smoke opened PuEmptyState Basic/First Run variants, verified root/title/
description/body/actions DOM, aria-labelledby, aria-describedby, and no console
errors.
Browser smoke opened PuSkeleton Basic Shapes/Text Rows/Animations/Loading Wrapper/
Accessibility variants, verified shape modifiers, row rendering, animation
classes, loading=false slot handoff, role=status, aria-busy, and no console
errors.
Browser smoke opened PuBentoGrid Admin Overview, verified one grid, five items,
key span/collapse/density classes, visible Anchor event and Applications text,
and no console errors.
Browser smoke opened PuSegmented Radio Control/Page View Tabs/Manual Keyboard
Activation variants, verified radiogroup and tablist semantics, click selection,
aria-checked, aria-selected, aria-controls, manual keyboard activation, and no
console errors.
```

Latest local run on 2026-05-13:

```
pnpm --filter @partner-up-dev/design-web type-check
pnpm --filter @partner-up-dev/design-web build
pnpm --filter @partner-up-dev/design-web story:coverage
pnpm --filter @partner-up-dev/design-web story:build

Story coverage:
32/44 public components covered.
PuBentoGrid and PuBentoItem covered by PuBentoGrid.story.vue.
```

Latest local run on 2026-05-17:

```
pnpm --filter @partner-up-dev/design-web type-check
pnpm --filter @partner-up-dev/design-web build
pnpm --filter @partner-up-dev/design-web story:coverage
pnpm --filter @partner-up-dev/design-web story:build

Story coverage:
39/46 public components covered in the current workspace.
PuSegmented and PuSegmentedItem covered by PuSegmented.story.vue.
Histoire built 32 stories and 131 variants.
```

Known warnings:

```
Dart Sass legacy JS API deprecation warning
Vite CJS Node API deprecation warning from Histoire/Vite tooling
FlexSearch eval warning from Histoire search dependency
```

Later CI command shape:

```json
{
  "test:interaction": "playwright test",
  "test:a11y": "playwright test --project=a11y",
  "test:visual": "lost-pixel"
}
```

## Story Coverage Policy

Every public component generated from `src/component-registry.ts` should have at
least one story.

Story locations:

```
packages/web/src/stories/actions/PuButton.story.vue
packages/web/src/stories/display/PuCell.story.vue
packages/web/src/stories/display/PuDescriptionList.story.vue
packages/web/src/stories/overlay/PuModal.story.vue
```

Reason:

```
The package currently publishes src/components. Keeping stories outside
src/components avoids shipping story files in the package while still allowing
Histoire to scan them.
```

## Gating Strategy

Fast PR gate:

```
generate:check
type-check
build
story:build
selected Playwright interaction tests
```

Release gate:

```
fast PR gate
pnpm pack consumer fixture
visual regression for stable stories
a11y scan for overlays/forms/navigation
```

Nightly or pre-release:

```
cross-browser Playwright
responsive visual set
full story visual snapshots
```

## Avoiding Snapshot Explosion

Rules:

```
Do not screenshot every prop combination.
Prefer canonical states and pairwise coverage for variants.
Keep visual baselines focused on tokens, density, layout, and high-risk states.
Move behavior-specific assertions into Playwright.
```

Initial visual variants:

```
default
disabled
loading or busy
error or warning
all sizes
all tones
mobile width
desktop width
```
