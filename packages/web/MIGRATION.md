# Migration Guide

This guide documents consumer action required by breaking or
compatibility-sensitive releases of `@partner-up-dev/design-web`.

Use `CHANGELOG.md` for the release history. Use this guide when a changelog
entry says a release requires migration work.

## Entries

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
