# PuDescriptionItem Action Slot Plan

Date: 2026-06-08

Status:

```
Follow-up layout correction in packages/web on 2026-06-08.
`pnpm --filter @partner-up-dev/design-web run verify` passed after the
affordance, alignment, padding, and item-collapse corrections.
```

## Follow-up Layout Correction

The original action-slot slice described `suffix` and `action` as trailing
content attached to a value row. That was too broad.

Corrected layout rule:

```
PuDescriptionList layout:
  stack | inline | grid

PuDescriptionItem internal layout:
  stack when the parent list is stack
  inline when the parent list is inline or grid

stack item layout:
  suffix/action belongs to the label row, even when there is no label text.

inline item layout:
  suffix/action is the definition value itself.
  It is not rendered after a separate value inside a value row.
  The internal label/value columns do not collapse because of viewport or
  container width; only the parent list's item columns may collapse.
  Default label alignment is start and default value alignment is end.
```

This means `value + action` is not the preferred description-item shape for
inline/grid. Consumers should put the visible value text inside the action slot
when the value is interactive.

## Source Gap

`mvp-HA` has `display/InfoRowAction.vue` for metadata rows where the label is
read-only and only the trailing value affordance is actionable.

Current design-web coverage:

```
InfoRow.vue -> PuDescriptionList / PuDescriptionItem for grouped facts
InfoRowAction.vue -> PuDescriptionItem action slot for trailing affordances
```

Relevant source evidence:

```
F:/CODING/Project/Anana/mvp-HA/apps/frontend/src/shared/ui/display/InfoRow.vue
F:/CODING/Project/Anana/mvp-HA/apps/frontend/src/shared/ui/display/InfoRowAction.vue
F:/CODING/Project/Anana/mvp-HA/apps/frontend/src/domains/pr/ui/composites/PRFactsCard.vue
packages/web/src/components/puDescriptionItem/puDescriptionItem.vue
packages/web/src/components/puDescriptionItem/puDescriptionItem.scss
packages/web/src/components/puCell/puCell.vue
packages/web/src/components/puCell/puCell.scss
```

## Decision

Enhance `PuDescriptionItem` with an explicit `action` slot instead of mapping
`InfoRowAction` to `PuCell`.

Reasoning:

```
PuDescriptionItem already owns the semantic fact row inside PuDescriptionList.
InfoRowAction is an interactive variant of the same metadata/fact rhythm.

PuCell is better for navigation rows, settings rows, and list items where the
row itself may be clickable. It does not provide dl/dt/dd semantics, label
width, grid/span behavior, hints, or empty-value handling.

The required interaction boundary is narrow: the trailing affordance is
clickable, not the whole description item.
```

## Slot Boundary

Keep the current `suffix` slot.

Add a new `action` slot.

Slot intent:

```
suffix
  Non-interactive value content when rendered in inline/grid.
  Label-row affordance when rendered in stack.
  Examples: badge, tag, status icon, unit, readonly marker.

action
  Interactive value content when rendered in inline/grid.
  Label-row affordance when rendered in stack.
  Examples: open map, view roster, copy value, open details.
```

Do not silently treat `suffix` as interactive. Consumers may still place custom
interactive content in `suffix`, but documented usage should steer interactive
values to `action`.

## Target DOM Shape

Current item body:

```vue
<dd class="pu-description-item__content">
  <div class="pu-description-item__value-row">
    <div class="pu-description-item__value">
      <slot>
        {{ displayValue }}
      </slot>
    </div>
    <div v-if="$slots.suffix" class="pu-description-item__suffix">
      <slot name="suffix" />
    </div>
  </div>

  <div v-if="hasHint" class="pu-description-item__hint">
    <slot name="hint">
      {{ props.hint }}
    </slot>
  </div>
</dd>
```

Planned item body:

```vue
<dd class="pu-description-item__content">
  <div class="pu-description-item__value-row">
    <div v-if="hasValue" class="pu-description-item__value">
      <slot>
        {{ displayValue }}
      </slot>
    </div>

    <div v-if="$slots.suffix" class="pu-description-item__suffix">
      <slot name="suffix" />
    </div>

    <div v-if="$slots.action" class="pu-description-item__action">
      <slot name="action" />
    </div>
  </div>

  <div v-if="hasHint" class="pu-description-item__hint">
    <slot name="hint">
      {{ props.hint }}
    </slot>
  </div>
</dd>
```

Important rendering rule:

```
When value is empty but action exists, do not render emptyText as the value.
The action itself is the right-side value affordance.
```

This supports the `InfoRowAction` migration shape:

```vue
<PuDescriptionItem label="Route">
  <template #action>
    <PuButton tone="secondary" variant="ghost" size="sm" shape="pill" @click="openRouteMap">
      View route map
      <template #trailing>
        <span class="i-mdi-chevron-right" />
      </template>
    </PuButton>
  </template>
</PuDescriptionItem>
```

Readonly suffix remains unchanged:

```vue
<PuDescriptionItem label="Status" value="Ready">
  <template #suffix>
    <PuTag tone="success">Active</PuTag>
  </template>
</PuDescriptionItem>
```

## Layout Behavior

`PuDescriptionItem` currently receives `stack`, `inline`, or `grid` from
`PuDescriptionList`.

Item-level layout:

```
stack:
Label
[value]
suffix/action belongs to the label row when a label exists.

inline:
Label | [value -------- suffix/action]

grid:
Label | [value -------- suffix/action]
```

`grid` has the same item-internal label/content layout as `inline`; the parent
list controls multi-column placement and `span=2`.

CSS behavior:

```
.pu-description-item__value {
  flex: 1 1 auto;
  min-width: 0;
}

.pu-description-item__suffix {
  flex: 0 0 auto;
}

.pu-description-item__action {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
  margin-left: auto;
}
```

When `action` is the only content in the value row, `margin-left: auto` keeps it
as the trailing affordance in `inline/grid` without requiring a dummy value. In
`stack`, suffix/action move to the label row when a label exists, matching the
two-line fact rhythm:

```
[Label ---------------- suffix/action]
[value]
```

Container collapse keeps the existing description item behavior. The action
stays in the value row after collapse for `inline/grid`; it does not make the
whole item interactive.

## Accessibility Contract

`PuDescriptionItem` should not emit click events and should not become a button.

Accessibility ownership:

```
PuDescriptionItem
  Maintains dt/dd name-value grouping.
  Provides layout only.

Action slot content
  Owns interactive semantics, accessible name, disabled state, href/to/native
  target, focus ring, and click behavior.
```

Recommended action content:

```
Use PuButton for command, href, or route actions.
Use an explicit aria-label when the visible action text is insufficient.
Do not place multiple unrelated controls in the action slot.
```

## Implementation Slice

Target files:

```
packages/web/src/components/puDescriptionItem/puDescriptionItem.vue
packages/web/src/components/puDescriptionItem/puDescriptionItem.scss
packages/web/src/stories/display/PuDescriptionList.story.vue
packages/web/skill.seed.json
```

Optional generated outputs after scripts:

```
packages/web/skills/design-web/references/components/PuDescriptionItem.md
packages/web/skills/design-web/references/components/PuDescriptionList.md
packages/web/skills/design-web/references/component-map.md
packages/web/types/components.d.ts
```

Implementation steps:

```
1. Add `hasAction = computed(() => Boolean(slots.action))`.
2. Render value only when `hasValue` is true.
3. Keep emptyText rendering only when neither value nor action exists.
4. Add `action` slot container after `suffix`.
5. Add CSS for `pu-description-item__action`.
6. Add a story variant showing:
   - readonly suffix badge
   - action-only right affordance
   - value plus action
   - inline layout collapse behavior
7. Regenerate skill references.
```

Potential value rendering logic:

```
hasRenderedValue =
  hasValue || (!hasAction && emptyText should display)
```

This prevents `-` or a list-level emptyText from appearing before an action-only
affordance.

## Implementation Record

Changed files:

```
packages/web/src/components/puDescriptionItem/puDescriptionItem.vue
packages/web/src/components/puDescriptionItem/puDescriptionItem.scss
packages/web/src/stories/display/PuDescriptionList.story.vue
packages/web/skill.seed.json
packages/web/skills/design-web/references/components/PuDescriptionItem.md
packages/web/skills/design-web/references/components/PuDescriptionList.md
tasks/frontend-primitive-coverage-gap/coverage-gap.md
tasks/frontend-primitive-coverage-gap/README.md
tasks/frontend-primitive-coverage-gap/pu-description-item-action-plan.md
```

Implemented behavior:

```
1. Added `action` slot detection.
2. Added `pu-description-item__action` after suffix in the value row.
3. Suppressed emptyText when the item has no value but does have an action.
4. Kept suffix as a separate non-interactive trailing slot.
5. Added the `Trailing Actions` story variant with readonly suffix,
   action-only affordance, and value plus action examples.
6. Fixed the existing PuDescriptionItem state selectors to target
   `is-collapse-on-mobile` and `is-empty`, matching createPuStateClass output.
7. Reduced the DescriptionList/DescriptionItem collapse threshold to 20rem so
   normal narrow desktop examples stay inline while truly constrained containers
   collapse before label/value/action overflow.
8. Regenerated agent skill references.
9. Corrected `stack` layout so suffix/action render in the label row when a
   label exists, while `inline/grid` keep them in the value row.
10. Follow-up correction: `stack` layout renders suffix/action in the label row
    even without label text.
11. Follow-up correction: `inline/grid` treats suffix/action as the definition
    value itself instead of appending them after a separate value.
12. Updated stories so inline/grid action examples put the visible value inside
    the action slot.
13. Follow-up correction: added inline item padding, centered simple inline/grid
    rows vertically, and removed item-level viewport/container collapse.
14. Follow-up correction: inline/grid values now default to end alignment while
    stack values remain start-aligned.
15. Follow-up correction: parent `grid` layout no longer leaks into
    PuDescriptionItem classes; grid-list items now use the same internal
    `pu-description-item--layout-inline` class as inline-list items.
```

## Migration Target

`mvp-HA` source:

```vue
<InfoRowAction
  label="Route"
  value="View route map"
  :aria-label="viewRouteMapAria"
  @click="showRouteMapModal = true"
/>
```

Design-web target:

```vue
<PuDescriptionItem label="Route">
  <template #action>
    <PuButton
      tone="secondary"
      variant="ghost"
      size="sm"
      shape="pill"
      :aria-label="viewRouteMapAria"
      @click="showRouteMapModal = true"
    >
      View route map
      <template #trailing>
        <span class="i-mdi-chevron-right" aria-hidden="true" />
      </template>
    </PuButton>
  </template>
</PuDescriptionItem>
```

Non-interactive fallback remains a normal description item:

```vue
<PuDescriptionItem label="Route" :value="routeDisplayText" />
```

## Non-Goals

```
Do not add a PuDescriptionItem click emit.
Do not add action, href, or to props directly to PuDescriptionItem in this slice.
Do not make suffix interactive by default.
Do not replace PuCell or change PuCell semantics.
Do not introduce a public PuInfoRowAction component unless a second use case
proves that a dedicated wrapper is clearer than the action slot.
```

## Verification

Required commands after implementation:

```
pnpm --filter @partner-up-dev/design-web exec vue-tsc --noEmit
pnpm --filter @partner-up-dev/design-web run generate
pnpm --filter @partner-up-dev/design-web run skill:generate
pnpm --filter @partner-up-dev/design-web run verify
```

Manual review checklist:

```
Inline layout:
  action aligns to the trailing edge and does not make the row clickable.

Stack layout:
  action renders in the label row and does not disturb long values.

Grid layout:
  action works inside two-column list placement and with span=2.

Empty/action-only:
  emptyText is not rendered before an action-only affordance.

Suffix/action:
  suffix remains suitable for readonly badges while action owns focus and click.
```

## Open Decisions

```
1. Whether the story should use PuButton directly or a native button to prove
   the slot is component-agnostic. Recommended: use PuButton for the primary
   story and native button only if a low-level stress case is needed.

2. Whether `PuDescriptionItem` should expose a scoped `action` slot payload.
   Recommended for first slice: no payload. Keep the slot simple.

3. Whether generated docs should explicitly warn against interactive content in
   `suffix`. Recommended: yes, as usage guidance rather than a runtime guard.
```
