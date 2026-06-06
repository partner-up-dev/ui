# UI Library Maintainability Infrastructure

Context:

```
The web package now has enough components that hand-maintained conventions are
starting to become expensive. This note captures the infrastructure that most
affects maintainability before adding the next component group.
```

Discussion rule:

```
Future discussion outcomes for this component track should be synchronized into
this task packet. Keep files split by topic to avoid monofile drift.
```

## Highest Impact Infrastructure

### 1. Shared Variant Vocabulary

Problem seen now:

```
theme:  "PrimaryContainer" | "Surface" | "SurfaceOutlined"
tone:   "section" | "outline" | "surface" | "primary" | ...
size:   "Small" | "Medium" | "Large"
size:   "small" | "medium" | "large"
gap:    "xs" | "sm" | "md" | "lg"
layout: "inline" | "stack" | "grid"
align:  "start" | "end" | "center"
```

Risk:

```
Same concept gains multiple names and casing conventions. Consumers learn each
component one by one, and library authors duplicate styling branches.
```

Needed infrastructure:

```
src/types/variants.ts
+-- PuTone
+-- PuStatusTone
+-- PuSize
+-- PuDensity
+-- PuAlign
+-- PuLayout
+-- PuGap

src/utils/variants.ts
+-- normalization helpers
+-- runtime validators where useful
+-- class-name helpers for modifier generation
```

Recommended direction:

```
tone      = semantic visual intent
status    = info | success | warning | error
size      = sm | md | lg
density   = compact | comfortable
align     = start | center | end
layout    = stack | inline | grid
```

### 2. Component Contract Standard

Problem seen now:

```
Some components expose customClass/customStyle.
Some use text props, some use default slot.
Some emit close/change/update:modelValue with different levels of payload detail.
Some support as, some hard-code root elements.
```

Risk:

```
APIs feel locally reasonable but globally uneven. Refactoring a consumer between
components becomes expensive.
```

Needed infrastructure:

```
Component contract guide:
+-- root prop conventions
+-- v-model conventions
+-- event naming conventions
+-- slots naming conventions
+-- accessibility props conventions
+-- controlled/uncontrolled component rules
```

Recommended baseline:

```
Root:
  as?: string when semantic root matters
  class/style pass-through via Vue attrs where possible

Slots:
  default for main content
  prefix/suffix for inline adornments
  actions for command groups
  header/footer for structural regions

Events:
  update:modelValue for v-model
  change for committed value changes
  close for dismiss/overlay close
  click only for native-like command surfaces
```

### 3. Export And Registry Generation

Problem seen now:

```
src/index.ts manually imports every component.
types/components.d.ts manually declares every global component.
New components require multiple synchronized edits.
```

Risk:

```
Forgotten exports, stale type declarations, and inconsistent plugin install
coverage.
```

Needed infrastructure:

```
scripts/generate-component-registry.ts
+-- read src/components/* metadata
+-- generate src/components.ts
+-- generate types/components.d.ts
+-- optionally generate package exports map fragments
```

Preferred component folder shape:

```
src/components/puExample/
+-- puExample.vue
+-- puExample.ts
+-- puExample.scss
+-- index.ts
+-- README.md or docs.md
```

Generated registry target:

```
src/component-registry.ts
+-- component name
+-- import path
+-- install list
+-- named exports
```

### 4. Documentation And Example Harness

Problem seen now:

```
The demo app is a single surface. Component behavior, props, states, and layout
examples are hard to scan as the library grows.
```

Risk:

```
Visual regressions hide in unrepresented states. Consumers lack canonical usage
examples.
```

Needed infrastructure:

```
Per-component examples:
+-- default
+-- all tones
+-- all sizes
+-- disabled/loading/error states where relevant
+-- slot-heavy example
+-- mobile-width example where layout changes
```

Potential options:

```
Storybook or Histoire for interactive docs
Vite demo routes if keeping dependency surface small
Static markdown generated from component metadata
```

Minimum pragmatic path:

```
src/stories/
+-- component story per category
+-- examples co-located in the story catalog
+-- visual smoke coverage for public components
```

### 5. Verification Matrix

Problem seen now:

```
type-check and build are covered. Interaction, keyboard, focus, responsive, and
visual states are mostly verified manually.
```

Risk:

```
UI regressions reach consumers after seemingly safe refactors.
```

Needed infrastructure:

```
Unit:
  Vue Test Utils for component API and emits

Interaction:
  Playwright component or demo-route tests for keyboard and pointer flows

Visual:
  screenshot checks for public states and responsive breakpoints

Accessibility:
  axe checks on demo routes or component fixtures
```

Minimum gate:

```
pnpm --filter @partner-up-dev/design-web type-check
pnpm --filter @partner-up-dev/design-web build
pnpm --filter @partner-up-dev/design-web test
pnpm --filter @partner-up-dev/design-web test:a11y
```

### 6. Accessibility Primitives

Problem seen now:

```
Modal, drawer, picker, accordion, tabs, and future descriptions all carry
accessibility obligations. Each component currently owns its own small slice.
```

Risk:

```
Focus traps, aria relationships, ids, escape handling, and body scroll locking
diverge across overlay and disclosure components.
```

Needed infrastructure:

```
src/composables/
+-- useId
+-- useControllableState
+-- useBodyScrollLock
+-- useFocusTrap
+-- useEscapeKey
+-- useDisclosure
+-- useRovingFocus
```

Immediate priority:

```
useId
useBodyScrollLock
useEscapeKey
useControllableState
```

### 7. Styling Architecture For Component Tokens

Problem seen now:

```
Global ref/sys/dcs tokens exist. Component-specific variables exist ad hoc in
some components. Names and override levels are not yet standardized.
```

Risk:

```
Customization happens through brittle class overrides. Component internals become
hard to change.
```

Needed infrastructure:

```
Component-level CSS variable naming convention:
--pu-<component>-<part>-<property>

State modifier convention:
.pu-<component>--tone-<tone>
.pu-<component>--size-<size>
.pu-<component>.is-disabled
.pu-<component>.is-active
```

Minimum rule:

```
Every public visual variant maps to CSS variables first, then class modifiers.
```

## Current Urgent Gaps

Priority order:

```
P0 Shared variant vocabulary
P0 Component contract standard
P1 Export and global type generation
P1 Accessibility composables
P1 Demo/catalog structure
P2 Test and visual regression matrix
P2 Component token convention
```

Why these first:

```
Shared enums and component contracts reduce API entropy before more components
land. Export generation removes manual sync work. Accessibility composables
prevent repeated overlay/disclosure logic. Demo/catalog and tests create feedback
loops for future refactors.
```

## Suggested First Slice

Implement before or together with PuDescriptionList:

```
src/types/variants.ts
src/composables/useId.ts
src/composables/useControllableState.ts
docs/component-contract.md
```

Then:

```
PuDescriptionList / PuDescriptionItem uses PuSize/PuDensity/PuAlign/PuLayout.
Future PuChip, PuInlineNotice, PuEmptyState reuse the same vocabulary.
```
