# Implementation Plan

Date: 2026-06-08

## Premises

```
The package does not need backwards compatibility for the targeted component
contracts.

Prefer strengthening existing public Pu* components over adding near-duplicate
components when the UI intent is the same.

Use already extracted shared vocabulary:
- PuAction for native, href, and route action targets.
- PuShape for rect, pill, and circle geometry.
- PuSize for sm, md, and lg sizing.
```

Current shared types:

```ts
type PuAction =
  | { native?: "button" | "submit" | "reset" }
  | { href: string; external?: boolean; target?: string; rel?: string }
  | { to: unknown };

type PuShape = "rect" | "pill" | "circle";
type PuSize = "sm" | "md" | "lg";
```

## Slice 1: PuCard Action And Selection Contract

Target files:

```
packages/web/src/components/puCard/puCard.ts
packages/web/src/components/puCard/puCard.vue
packages/web/src/components/puCard/puCard.scss
packages/web/src/stories/display/PuCard.story.vue
packages/web/skill.seed.json
```

API plan:

```ts
action?: PuAction;
active?: boolean;
disabled?: boolean;
selectable?: boolean;
keepContentMounted?: boolean;
expandedResetKey?: string | number | boolean | null;
```

Emit plan:

```ts
click(event: MouseEvent): true;
```

Behavior:

```
1. Reuse the same PuAction resolution model as PuButton:
   - route action renders the globally registered RouterLink component name
   - href action renders `a`
   - otherwise preserve the presentational root from `as` and apply role-button
     semantics when selectable or action-native behavior is needed

2. Disabled behavior:
   - role-button roots use `aria-disabled`, `tabindex`, and click/key
     prevention
   - href and route roots use `aria-disabled`, `tabindex=-1`, and click
     prevention

3. Active behavior:
   - add visual active state
   - route and href roots may expose `aria-current="page"`
   - selectable role-button roots may expose `aria-pressed`

4. Avoid nested interactive markup guidance:
   - stories and generated docs must warn not to put buttons or links inside an
     interactive card root
   - use non-interactive PuCard when footer actions are needed
```

Expansion behavior:

```
1. Keep current controlled/uncontrolled expanded model.
2. `expandedResetKey` resets only uncontrolled expanded state to
   `defaultExpanded`.
3. `keepContentMounted=false` keeps current unmount-on-collapse behavior.
4. `keepContentMounted=true` keeps body DOM mounted, hides it from interaction
   and the accessibility tree while collapsed, and uses the same motion contract
   as the normal body transition where possible.
```

Story additions:

```
Interactive Action Card
Active And Disabled Cards
Keep Content Mounted
Expanded Reset Key
```

Risks:

```
Interactive card roots can create invalid nested-interactive markup when
consumers place PuButton, links, or controls inside the card. This must be
documented as a usage constraint.

RouterLink support depends on the consuming app globally registering RouterLink,
matching the current PuButton action contract.

Native `<button>` roots are intentionally avoided for cards because cards own
flow content such as headings, paragraphs, and regions. Role-button behavior
keeps the card DOM valid while preserving keyboard activation.
```

## Slice 2: PuChipGroup Fit Mode

Target files:

```
packages/web/src/components/puChipGroup/puChipGroup.ts
packages/web/src/components/puChipGroup/puChipGroup.vue
packages/web/src/components/puChipGroup/puChipGroup.scss
packages/web/src/stories/display/PuChip.story.vue
packages/web/skill.seed.json
```

API plan:

```ts
fit?: boolean;
```

Behavior:

```
1. Preserve current slot-based API.
2. Default `fit=false` keeps current flex wrapping behavior.
3. When `fit=true`, measure direct rendered child elements inside the group and
   show only the complete items that fit in the available inline size.
4. Fit mode should imply nowrap behavior at the visual layer, even when the
   public `wrap` prop is left at its default.
5. Hidden items must not remain keyboard-focusable.
```

Measurement sequence:

```
ResizeObserver(root)
  -> nextTick
  -> requestAnimationFrame
  -> read root clientWidth and child offsetWidth/offsetLeft
  -> update visible count
```

Initial render policy:

```
Prefer rendering the measuring row hidden until the first measurement completes
so the user does not see all chips flash before clipping.
```

Story additions:

```
Fit To Width
Fit With Dynamic Container
```

Risks:

```
Slot content can include fragments, conditional nodes, or non-chip elements.
The implementation should measure element children only and keep behavior
layout-based rather than PuChip-specific.

Font and icon loading can change widths after first render; ResizeObserver plus
a scheduled measurement is required.
```

## Slice 3: PuImg Fallback And Shape Contract

Target files:

```
packages/web/src/components/puImg/puImg.ts
packages/web/src/components/puImg/puImg.vue
packages/web/src/components/puImg/puImg.scss
packages/web/src/stories/display/PuImg.story.vue
packages/web/skill.seed.json
```

API plan:

```ts
src?: string;
alt?: string;
name?: string;
fallbackInitial?: string;
shape?: PuShape;
bordered?: boolean;
```

Slot plan:

```vue
<template #fallback="{ initial, name }">
  {{ initial }}
</template>
```

Cleanup plan:

```
Because backwards compatibility is not required, replace the old radius-focused
surface with shape:

- remove or deprecate local PuImgRadius usage in the implementation plan
- use PuShape for rect and pill geometry
- keep size, width, height, mode, lazyLoad, loading slot, and error event unless
  implementation evidence shows they are part of the old broken surface
```

Fallback behavior:

```
1. Render img only when src exists and has not errored.
2. Loading state keeps the loading slot behavior.
3. Missing src or image error can render fallback content.
4. Fallback priority:
   - fallback slot
   - fallbackInitial prop
   - first visible character from name
   - default image error icon
5. `alt` applies to the rendered img. Fallback content should expose accessible
   image semantics only when a usable alt or name exists.
```

Shape behavior:

```
shape="rect" uses the standard small component radius.
shape="pill" uses full radius; when width and height are equal this gives an
avatar-style circle.

The same shape class must apply to image, loading placeholder, and fallback so
states do not visually leak outside the root radius.
```

Story additions:

```
Fallback Initial
Fallback Slot
Shapes And Border
Avatar-like Sizes
```

Risks:

```
PuShape currently contains rect and pill because it was extracted for action
geometry. That is sufficient for avatar-like image fallback, but it does not
represent every historical image radius. Avoid reintroducing a broad radius
scale unless another component proves the need.

Fallback initial extraction must handle empty names and non-Latin names without
throwing or producing invisible content.
```

## Slice 4: PuTabs And PuTab API Alignment

Target files:

```
packages/web/src/components/puTabs/puTabs.ts
packages/web/src/components/puTabs/puTabs.vue
packages/web/src/components/puTabs/puTabs.scss
packages/web/src/components/puTab/puTab.ts
packages/web/src/components/puTab/puTab.vue
packages/web/src/components/puTab/puTab.scss
packages/web/src/stories/display/PuTabs.story.vue
packages/web/skill.seed.json
```

Decision:

```
Do not add a separate public PuTabBar component.

The mvp-HA `navigation/TabBar.vue` primitive is a source compatibility gap,
not a separate durable design-system intent. Move its reusable behavior into
PuTabs and PuTab.

Backwards compatibility is not required. Remove the legacy index-only,
text-based, Large/Medium/Small tab contract instead of supporting both APIs.
```

API plan:

```ts
type PuTabsVariant = "line" | "pill";
type PuTabValue = string | number;

type PuTabItem = {
  value: PuTabValue;
  label: string;
  showDot?: boolean;
  disabled?: boolean;
};

// PuTabs
tabs: PuTabItem[];
modelValue: PuTabValue;
variant?: PuTabsVariant;
size?: PuSize;

// PuTab
label?: string;
active?: boolean;
disabled?: boolean;
showDot?: boolean;
variant?: PuTabsVariant;
size?: PuSize;
```

Vocabulary plan:

```
Use the shared PuSize vocabulary from packages/web/src/types/variants.ts.
Do not define a local PuTabsSize alias unless implementation readability needs
one that directly aliases PuSize.

Keep PuTabsVariant local to the tabs contract because line and pill describe
tab presentation, not the shared PuControlVariant treatment vocabulary.
```

Emit plan:

```ts
"update:modelValue": (value: PuTabValue) => true;
change: (payload: { value: PuTabValue; index: number; tab: PuTabItem }) => true;
```

Behavior:

```
1. PuTabs owns tablist semantics, selection state, keyboard navigation, and
   active item scrolling.
2. PuTab owns only single-tab visual rendering: label slot/text, dot, active,
   disabled, variant, and size styles.
3. `variant="line"` is the standard section-tab treatment.
4. `variant="pill"` is the TabBar-style horizontally scrolling treatment.
5. Disabled tabs must not emit selection changes and must be skipped by
   keyboard navigation.
6. Active tabs should hide their dot by default, matching the current behavior
   where the dot indicates inactive attention.
```

Accessibility behavior:

```
1. Root uses `role="tablist"`.
2. Each interactive item uses `role="tab"`, `aria-selected`, `aria-disabled`
   when relevant, and roving `tabindex`.
3. ArrowLeft and ArrowRight move to the previous or next enabled tab.
4. Home and End move to the first or last enabled tab.
5. Keyboard movement selects the target tab and focuses it.
```

Scrolling and slots:

```
1. Keep horizontal overflow as the default layout for PuTabs.
2. When modelValue changes, scroll the active tab into view with inline nearest
   behavior after DOM update.
3. Add an append slot rendered after the scrollable tab list for small trailing
   controls.
4. The append slot must not be inside `role="tablist"` unless it renders a tab.
```

Cleanup plan:

```
Remove:
- legacy size values: Large, Medium, Small
- index-only modelValue assumptions
- `tabs[].text`

Replace with:
- size values: sm, md, lg
- value-based modelValue
- `tabs[].label`
```

Story additions:

```
Controlled Value Tabs
Pill Tab Bar
Scrollable With Active Auto-scroll
Disabled Tabs And Keyboard Navigation
Append Slot
Standalone PuTab Variants
```

Risks:

```
Uniapp currently has a matching legacy PuTabs/PuTab implementation. If this
slice changes only design-web, the package split should be intentional and
documented. If parity is required, apply the same contract to packages/uniapp.

The append slot can accidentally be used as a tab-like item. Documentation
should position it as a trailing action/filter affordance, not part of the tab
set.
```

## Documentation And Generation

Required after implementation:

```
pnpm --filter @partner-up-dev/design-web run generate
pnpm --filter @partner-up-dev/design-web run skill:generate
pnpm --filter @partner-up-dev/design-web run verify
```

Documentation targets:

```
packages/web/skill.seed.json
packages/web/skills/design-web/references/component-map.md
packages/web/skills/design-web/references/components/PuCard.md
packages/web/skills/design-web/references/components/PuChipGroup.md
packages/web/skills/design-web/references/components/PuImg.md
```

Generated reference files should be produced by the package scripts, not edited
directly.

## Open Decisions Before Source Edits

```
1. Whether PuCard should infer `selectable` from the presence of an action, or
   whether action cards are always interactive and selectable only adds selected
   semantics.

2. Whether PuChipGroup fit mode should expose hidden count now. Current plan
   does not expose hidden count to keep the API narrow.

3. Whether PuImg should keep the existing `showError` prop after fallback slot
   support. Current plan keeps error event behavior but may simplify visual
   error display into fallback.
```
