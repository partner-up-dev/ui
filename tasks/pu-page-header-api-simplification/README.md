# PuPageHeader API Simplification

## Status

- Mode: Execute
- Result: Implemented
- Request date: 2026-06-20
- Scope: `packages/web` `PuPageHeader`

## User Intent

Simplify `PuPageHeader` into a neutral two-row page title primitive:

- no tone prop; neutral tone only
- no layout prop; the structure is always:
  - row 1 main: left region `(left action, title)` plus right actions
  - row 2 meta: custom `meta` slot
- no third/body row; remove default body slot from the component contract
- replace `bordered` with a `line` variant, similar to `PuTextarea`
- remove container-style `soft`, `solid`, and `outline` variants

## Current Evidence

- `PuPageHeader` currently has `layout: inline | stack`, default `inline`.
- `PuPageHeader` currently uses `PuContainerVariant`: `plain | soft | outline | solid`.
- `bordered` currently adds bottom separator styling outside `variant`.
- default slot currently renders as `.pu-page-header__body`, creating a third row.
- `PuTextarea` uses field variants `line | borderless | outline`; its `line` variant is an underline-only shell.

## Impact Surface

- Component source:
  - `packages/web/src/components/puPageHeader/puPageHeader.ts`
  - `packages/web/src/components/puPageHeader/puPageHeader.vue`
  - `packages/web/src/components/puPageHeader/puPageHeader.scss`
- Stories:
  - `packages/web/src/stories/display/PuPageHeader.story.vue`
  - `packages/web/src/stories/layout/PuPageScaffold.story.vue`
- Generated/agent-facing docs:
  - `packages/web/skill.seed.json`
  - `packages/web/skills/design-web/references/components/PuPageHeader.md`
  - `packages/web/skills/design-web/references/usage-rules.md`

## Proposed Contract

```ts
type PuPageHeaderVariant = "plain" | "line";
```

Props kept:

- `as`
- `title`
- `subtitle`
- `titleAs`
- `showBack`
- `backLabel`
- `size`
- `variant`

Props removed:

- `layout`
- `bordered`

Slots kept:

- `actions`
- `back-icon`
- `meta`
- `subtitle`
- `title`

Slots removed:

- `default`

## Notes

- This is a breaking API simplification for consumers using `layout`, `bordered`,
  container variants, or default slot body content.
- Existing local stories use `layout="stack"`, `variant="soft|outline|solid"`,
  `bordered`, and default body content, so implementation must update stories
  in the same change.

## Implementation Record

- Removed `layout` and `bordered` from `PuPageHeader`.
- Changed `PuPageHeaderVariant` to `plain | line`.
- Removed default/body slot rendering.
- Reworked DOM into a fixed main row plus optional meta row.
- Updated `PuPageHeader` and `PuPageScaffold` stories.
- Regenerated agent-facing skill references.

## Verification

- `pnpm --filter @partner-up-dev/design-web exec vue-tsc --noEmit`
- `pnpm --filter @partner-up-dev/design-web run skill:generate:check`
- `pnpm --filter @partner-up-dev/design-web run story:coverage`
- `pnpm --filter @partner-up-dev/design-web run story:build`

Known workspace blocker:

- `pnpm --filter @partner-up-dev/design-web run type-check` currently fails
  before Vue checking because registry generation discovers the untracked
  `PuFloatPanel` component files and expects tracked registry output to include
  that parallel component work.
