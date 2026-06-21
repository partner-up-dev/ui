# Human Review Notes

## 2026-06-20 Review

Reviewer found the first generated report low-value overall because most
findings were low-confidence candidates and many were wrapper-level noise.

Screenshots that looked potentially useful on manual review:

```text
output/screenshots/puform/039-validation.png
output/screenshots/pudialog/194-open-state.png
```

Interpretation:

- `PuForm / Validation` appears visually cramped in the story screenshot.
- This may be a component contract issue or a story-composition issue. The
  story places several `PuFormItem` children and an action row directly inside
  `PuForm`; current `PuForm` is a column flex container without a gap.
- `PuDialog / Open State` looked acceptable in the generated screenshot even
  though it was the motivating example. The audit run did not edit
  `PuDialog`; the screenshot reflects the current working tree state. In this
  story, the slotted paragraph uses `.pu-story__text`, which sets `margin: 0`,
  so the apparent dialog body spacing is not being supplied by default
  paragraph margins.
- `PuDialog / Confirmation` was the better reproduction for missing shell
  rhythm: once opened, it renders the default header directly followed by the
  default footer, with no body region between them. The original first-pass
  scanner did not click the "Open dialog" control, so it missed this interactive
  state.
- The first-pass report should not be treated as an actionable bug list.

Boundary insight:

- Spacing between component regions is a topology boundary. If a component shell
  relies on slotted child margins to separate header, content, and footer, that
  is a boundary error: the parent shell owns the region rhythm. The audit should
  explicitly detect slotted first/last child margins that contribute to parent
  region spacing.

Follow-up direction:

- Shift from broad noisy candidate generation toward a smaller set of review
  targets with better reason codes.
- Separate story-composition spacing from component-owned spacing.
- Suppress obvious wrapper noise such as inner `__content` nodes that have zero
  padding by design.
- Raise candidate confidence only when the measured element pair maps to a
  visible visual relationship in the screenshot.
- Add a boundary/topology rule that flags parent region spacing caused by
  slotted first-child or last-child margins.
- Add interactive-state coverage for stories whose visible spacing state is
  behind a button, especially overlay confirmation variants.
