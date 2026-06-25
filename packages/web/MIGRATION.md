# Migration Guide

This guide documents consumer action required by breaking or
compatibility-sensitive releases of `@partner-up-dev/design-web`.

Use `CHANGELOG.md` for the release history. Use this guide when a changelog
entry says a release requires migration work.

## Entries

### PuPageHeader removal

The web package removed `PuPageHeader` and folded page, surface, panel, and
card header structure into `PuHeader`.

Consumer action:

- Replace `PuPageHeader` imports and tags with `PuHeader`.
- For page-level shells, place `PuHeader` inside the `PuPageScaffold`
  `pageHeader` slot and set `titleAs="h1"` when the page title should remain
  the primary heading.
- Move any back affordance into `PuHeader`'s `leading` slot with
  application-owned button or link behavior.
- `PuHeader` no longer accepts a `padding` prop and no longer provides default
  outer inset. Move any surrounding header padding onto the containing page,
  surface, panel, card, or slot wrapper.
- `PuPageScaffold` now treats `header` as a raw custom slot with
  consumer-owned spacing. Use `pageHeader` when the scaffold should keep
  owning the standard page-header inset.

### PuCheckbox reset and PuCheckboxGroup removal

The web package removed the previous `PuCheckboxGroup` public component and
replaced the previous `PuCheckbox` contract with a narrower native-checkbox
implementation.

Consumer action:

- Replace `PuCheckboxGroup` usages with application-owned multi-select state
  until a new group contract exists.
- Update `PuCheckbox` bindings to boolean `v-model` / `modelValue`.
- Replace old props such as `shape`, `type`, `trueValue`, `falseValue`,
  `checkedColor`, `inline`, `maxWidth`, and custom class props.
- Use `size="sm" | "md" | "lg"` and `tone="neutral" | "primary" |
  "secondary" | "tertiary" | "danger"` for supported visual variation.
