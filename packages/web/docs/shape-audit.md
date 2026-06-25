# PartnerUp Web Shape Audit

This audit checks existing `packages/web` components against
`docs/design-style-foundation.md`. It focuses on default roundness drift: places
where component defaults appear rounded even though the emerging base style says
rectangular surfaces should be square by default.

## Baseline

- Rect default: `shape="rect"` when a shape option exists.
- No-shape shell default: `--sys-radius-none`.
- Explicit rounded forms: `--sys-radius-pill` and `--sys-radius-full`.
- Audit candidates: default component shells without a shape option that do not
  use `--sys-radius-none`, or components whose runtime shape default is not
  `rect`.

## Aligned Defaults

These components either map their default rectangular shape to
`--sys-radius-none`, or use `pill`/`full` only for explicit rounded forms.

| Component | Evidence | Reading |
| --- | --- | --- |
| `PuButton` | `shape` defaults to `rect`; rect radius maps to `--sys-radius-none`. | Aligned. |
| `PuTag` | `shape` defaults to `rect`; rect radius maps to `--sys-radius-none`. | Aligned. |
| `PuChip` | `shape` defaults to `rect`; rect radius maps to `--sys-radius-none`; remove affordance uses `pill`. | Aligned. |
| `PuImg` | `shape` defaults to `rect`; rect radius maps to `--sys-radius-none`; circular image masks are explicit. | Aligned. |
| `PuImgCropper` | `shape` defaults to `rect`; legacy `square` remains a square-crop alias and `round` is explicit. | Aligned. |
| `PuCheckbox` | Visual box uses `--sys-radius-none`; size and tone use shared package vocabulary. | Aligned. |
| `PuRadio` | Visual box uses `--sys-radius-none`; selected indicator stays square within the shell. | Aligned. |
| `PuSpinner`, skeleton circle/pill variants | Use `full` or `pill` for intrinsic circular geometry. | Intentional rounded primitives. |
| `PuCard` | No shape option; root shell uses `--sys-radius-none`; toggle affordance uses explicit circular geometry. | Aligned. |
| `PuInlineNotice` | No shape option; layout shell uses `--sys-radius-none`; close affordance uses `pill`. | Aligned. |
| `PuDialog` | No shape option; dialog shell uses `--sys-radius-none`; icon and close controls use `full`. | Aligned with explicit circular affordances. |
| `PuModal` | No shape option; modal shell uses `--sys-radius-none`. | Aligned. |

## Default Roundness Drift

These components still use non-`none` radius on default or rectangular shells.
They are the next candidates for a square-corner correction pass.

| Priority | Component | Evidence | Suggested next change |
| --- | --- | --- | --- |
| High | `PuBentoItem` | Root shell uses `--sys-radius-medium`; inset uses `small`. | Use `--sys-radius-none` for default shells unless a rounded shape option is introduced. |
| High | `PuCellGroup` | Soft, outline, and solid group shells use `--sys-radius-medium`. | Use `--sys-radius-none` for grouped surfaces unless a rounded shape option is introduced. |
| High | `PuDescriptionList` | Soft, outline, and solid container shells use `--sys-radius-medium`; bordered body uses `small`. | Use `--sys-radius-none` for outer shells and bordered body unless a rounded shape option is introduced. |
| High | `PuEmptyState` | Layout shell uses `--sys-radius-medium`; icon uses `pill`. | Use `--sys-radius-none` for the layout shell; keep icon roundness only if the icon badge remains deliberate. |
| High | `PuLoadingState` | Layout shell uses `--sys-radius-medium`. | Use `--sys-radius-none` for the layout shell. |
| Medium | Field controls (`PuInput`, `PuSelect`, `PuTextarea`, `PuNumberInput`, `PuChipsEditor`) | Bounded shells use `xsmall`; line variants remove frame radius. | Use `--sys-radius-none` for bounded rect shells, preserving line and borderless behavior. |
| Medium | `PuSegmented` / `PuSegmentedItem` | Default rectangular track/item surfaces use `small`; pill treatment is explicit. | Use `--sys-radius-none` for default rectangular surfaces; keep pill variants explicit. |
| Medium | `PuTabs` / `PuTab` | Line/default tab surfaces still include square-corner aliases while pill is explicit. | Use `--sys-radius-none` for line/default rectangular surfaces; keep pill variants explicit. |
| Medium | `PuFilesUpload` | Dropzone, icons, URL entry, item shells, and previews use `--sys-radius-medium`; small controls also use `pill`. | Split into square container shells and explicit action affordances. |

## Overlay And Picker Decision

These components are visually prominent but may deserve a deliberate exception.
Do not change them mechanically until the package decides whether these platform
affordances are allowed to be softer than in-page content. `PuDialog` and
`PuModal` have already been corrected to the square-corner base.

| Component | Evidence | Decision needed |
| --- | --- | --- |
| `PuDrawer` | Top corners use `--sys-radius-medium`. | Decide whether bottom-sheet/mobile affordance overrides web square defaults. |
| `PuWheelPicker` | Picker shell uses `--sys-radius-large`; highlight uses `--sys-radius-medium`. | Decide whether picker selection chrome is a rounded affordance or should be rectangular. |

## Follow-Up Order

1. Align remaining content containers: `PuBentoItem`, `PuCellGroup`,
   `PuDescriptionList`, `PuEmptyState`, and `PuLoadingState`.
2. Audit complex nested surfaces: `PuFilesUpload`.
3. Make the remaining overlay-shell decision, then update `PuDrawer` and
   `PuWheelPicker` consistently.
4. After component defaults are consistent, decide whether `medium` and `large`
   token names still fit the style base or should be reframed as compatibility
   tokens.
