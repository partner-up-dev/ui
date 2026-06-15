# PuTabs Anchor Event List Mode Surface Gap

Date: 2026-06-15

## Request

`PuTabs` pill variant does not currently reproduce the Tabs visual used by
`partner-up-dev/mvp-HA` `master` branch in
`apps/frontend/src/domains/event/ui/surfaces/AnchorEventListModeSurface.vue`.

## Classification

- Type: Reality / Constraint
- Mode: Explore, then Solidify
- Target package: `packages/web`
- No component source changes have been made in this task packet.

## Source Evidence

Target application:

```
https://github.com/partner-up-dev/mvp-HA/blob/master/apps/frontend/src/domains/event/ui/surfaces/AnchorEventListModeSurface.vue
https://github.com/partner-up-dev/mvp-HA/blob/master/apps/frontend/src/shared/ui/navigation/TabBar.vue
```

Current design package:

```
packages/web/src/components/puTabs/puTabs.vue
packages/web/src/components/puTabs/puTabs.ts
packages/web/src/components/puTabs/puTabs.scss
packages/web/src/components/puTab/puTab.vue
packages/web/src/components/puTab/puTab.ts
packages/web/src/components/puTab/puTab.scss
packages/web/src/stories/display/PuTabs.story.vue
packages/web/skills/design-web/references/components/PuTabs.md
packages/web/skills/design-web/references/components/PuTab.md
```

Prior package decision:

```
tasks/frontend-primitive-coverage-gap/coverage-gap.md
tasks/frontend-primitive-coverage-gap/implementation-record.md
```

The prior decision intentionally folded the mvp-HA `TabBar.vue` behavior into
`PuTabs` / `PuTab`: data-driven items, horizontal scrolling, active auto-scroll,
pill-styled presentation, and append slot.

## Observed Gap

The behavior surface is mostly covered, but the visual treatment is not a full
match.

Target `TabBar.vue` visual:

```scss
.tab-bar__tab {
  min-height: calc(var(--sys-spacing-large) + var(--sys-spacing-small) + var(--sys-spacing-xsmall));
  padding: var(--sys-spacing-small) var(--sys-spacing-medium);
  border: 1px solid var(--sys-color-outline);
  border-radius: 999px;
  background: transparent;
  color: var(--sys-color-on-surface);
}

.tab-bar__tab--active {
  background: var(--sys-color-primary);
  color: var(--sys-color-on-primary);
  border-color: var(--sys-color-primary);
}

.tab-bar__tab--expired {
  border-style: dashed;
  opacity: 0.6;
}
```

Current `PuTab` pill visual:

```scss
.pu-tab--variant-pill {
  min-height: var(--pu-tab-pill-height, 34px);
  padding: 0 var(--pu-tab-pill-padding-inline, 14px);
  border: 1px solid var(--sys-color-outline-variant);
  border-radius: var(--sys-radius-pill);
  background: var(--sys-color-surface);
  color: var(--sys-color-on-surface-variant);
}

.pu-tab--variant-pill.is-active {
  border-color: var(--sys-color-primary);
  background: var(--sys-color-primary-container);
  color: var(--sys-color-on-primary-container);
}
```

Concrete differences:

- Default inactive tab background: target is transparent, current `PuTab` is
  `surface`.
- Default inactive border: target is `outline`, current `PuTab` is
  `outline-variant`.
- Default inactive text: target is `on-surface`, current `PuTab` is
  `on-surface-variant`.
- Active tab fill: target is `primary`, current `PuTab` is
  `primary-container`.
- Active tab text: target is `on-primary`, current `PuTab` is
  `on-primary-container`.
- Size geometry: target md-like height is
  `large + small + xsmall` spacing, current md pill height is `34px`.
- Expired tab affordance: target supports per-item dashed border and reduced
  opacity through `tabClass`; current `PuTabs` item model has no public visual
  state for this.
- Hover/active affordance: target has hover background and active scale; current
  `PuTab` pill has transition but no hover/press treatment.

## Decision

Decision from product/design owner:

```
Change the existing variant="pill" visual. This is timely correction, not an
additive variant expansion.
```

Implication:

```
PuTabs variant="pill" should match the mvp-HA TabBar pill treatment:
- inactive: transparent background, outline border, on-surface text
- active: primary background, primary border, on-primary text
- hover: surface-container-high for inactive tabs
- pressed: slight scale feedback
```

This intentionally changes the current soft pill treatment that uses
`surface`, `outline-variant`, `on-surface-variant`, `primary-container`, and
`on-primary-container`.

## Candidate Implementation Direction

The expired-date treatment should still not be passed as arbitrary class names.
Use a bounded item field instead:

```ts
type PuTabItem = {
  value: PuTabValue;
  label: string;
  showDot?: boolean;
  disabled?: boolean;
  state?: "default" | "muted" | "dashed";
};
```

For the Anchor Event list mode case, the corrected pill treatment plus
`state="dashed"` for expired date groups would reproduce the existing target
without application-owned deep CSS.

## Verification Needed

If implementation is approved:

```
pnpm --filter @partner-up-dev/design-web run generate
pnpm --filter @partner-up-dev/design-web run skill:generate
pnpm --filter @partner-up-dev/design-web run verify
```

Also update:

```
packages/web/src/stories/display/PuTabs.story.vue
packages/web/skill.seed.json
packages/web/skills/design-web/references/components/PuTabs.md
packages/web/skills/design-web/references/components/PuTab.md
packages/web/skills/design-web/references/usage-rules.md
packages/web/package.json
packages/web/src/version.ts
```

## Implementation Record

Implemented on: 2026-06-15

Changed files:

```
packages/web/src/components/puTabs/puTabs.ts
packages/web/src/components/puTabs/puTabs.vue
packages/web/src/components/puTabs/puTabs.scss
packages/web/src/components/puTab/puTab.ts
packages/web/src/components/puTab/puTab.vue
packages/web/src/components/puTab/puTab.scss
packages/web/src/stories/display/PuTabs.story.vue
packages/web/skill.seed.json
packages/web/skills/design-web/references/components/PuTabs.md
packages/web/skills/design-web/references/components/PuTab.md
packages/web/skills/design-web/references/usage-rules.md
```

Summary:

```
- PuTabs tabs[] now accepts state?: "default" | "dashed".
- PuTabs passes tab.state to PuTab.
- PuTab exposes a state prop and emits state modifier classes.
- PuTab pill inactive visual now uses transparent background, outline border,
  and on-surface text.
- PuTab pill active visual now uses primary background, primary border, and
  on-primary text.
- PuTabs pill hover uses surface-container-high for inactive tabs.
- PuTabs pill press uses scale(0.99).
- PuTab pill dashed state uses dashed border and invalid opacity.
- PuTabs story now demonstrates date-like pill tabs with dashed expired tabs.
- Agent-facing generated references document pill and dashed state behavior.
- Bumped @partner-up-dev/design-web from 0.4.2 to 0.4.3 and regenerated
  src/version.ts.
```

Verification:

```
pnpm --filter @partner-up-dev/design-web run generate
  passed
  result: generated component registry already up to date

pnpm --filter @partner-up-dev/design-web run skill:generate
  passed
  result: generated 56 agent skill files

pnpm --filter @partner-up-dev/design-web run type-check
  passed after version.ts regeneration

pnpm --filter @partner-up-dev/design-web run verify
  passed
  story coverage: 49/49 public components have stories
  story build: 41 stories, 199 variants
```
