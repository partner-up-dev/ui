# Implementation Record

Date: 2026-06-08

## Implemented Slice

```
PuCard
- added action, selectable, active, disabled, keepContentMounted, and
  expandedResetKey props
- added click emit for interactive card roots
- reused the shared PuAction target model for href and route cards
- kept non-link interactive cards as the configured root element with
  role-button semantics instead of native button roots
- added active, disabled, interactive, and mounted-expansion styling

PuChipGroup
- added fit prop
- added ResizeObserver-driven child measurement
- hides overflowing element children with the hidden attribute so hidden chips
  do not remain focusable

PuImg
- replaced radius-specific image shape with shared PuShape
- added alt, name, fallbackInitial, shape, and bordered props
- added fallback slot with initial and name slot props
- kept loading slot and load/error events
```

## Files Changed

```
packages/web/src/components/puCard/puCard.ts
packages/web/src/components/puCard/puCard.vue
packages/web/src/components/puCard/puCard.scss
packages/web/src/components/puChipGroup/puChipGroup.ts
packages/web/src/components/puChipGroup/puChipGroup.vue
packages/web/src/components/puChipGroup/puChipGroup.scss
packages/web/src/components/puImg/puImg.ts
packages/web/src/components/puImg/puImg.vue
packages/web/src/components/puImg/puImg.scss
packages/web/src/stories/display/PuCard.story.vue
packages/web/src/stories/display/PuChip.story.vue
packages/web/src/stories/display/PuImg.story.vue
packages/web/skill.seed.json
packages/web/scripts/generate-agent-skill.mjs
packages/web/src/types/expandable.ts
packages/web/src/composables/usePuExpandableState.ts
packages/web/src/types/index.ts
packages/web/src/composables/index.ts
```

## Decisions

```
1. PuCard action cards use anchor or RouterLink roots for link-like targets.
   Selectable/native action cards use role-button semantics on the card root
   instead of rendering a native button. This avoids invalid HTML from headings,
   paragraphs, and layout regions inside a button.

2. PuCard action presence makes the card interactive. selectable is reserved
   for button-like choice cards that should expose pressed state through
   aria-pressed.

3. PuChipGroup fit mode remains intentionally narrow: it does not expose hidden
   count, visible count, or overflow slot yet.

4. PuImg uses the shared PuShape vocabulary. shape="pill" is the avatar-like
   full-radius form; no separate circle/rounded image vocabulary was added.

5. PuImg fallback text is not a separate prop. Consumers can use fallbackInitial
   for simple cases or the fallback slot for custom rendering.

6. The generated skill parser now skips full prop and emit value expressions
   after reading a top-level key. This prevents implementation details such as
   `type`, `default`, `_event`, and `_value` from being listed as public API.

7. PuExpandablePolicy is a shared implementation contract, not a bundled public
   prop. PuCard keeps flat Vue props, assembles an internal policy, and delegates
   controlled/uncontrolled expansion state to usePuExpandableState.
```

## Verification

```
pnpm --filter @partner-up-dev/design-web run generate
  passed
  result: generated component registry already up to date

pnpm --filter @partner-up-dev/design-web run skill:generate
  passed
  result: generated 44 agent skill files
  note: existing PuScrollView story coverage warning remains

pnpm --filter @partner-up-dev/design-web run type-check
  passed

pnpm --filter @partner-up-dev/design-web run verify
  passed
  story coverage: 38/39 public components
  missing backlog: PuScrollView
  existing story build warning remains:
        Group layout not found for PuPageScaffold.story.vue
```
