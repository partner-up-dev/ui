# Changelog

## 0.3.0

### Minor Changes

- 40b1617: Add PuLoadingState for page and region loading states with a visible spinner,
  message content, surface treatments, and status semantics.

### Patch Changes

- 3e286eb: Enhance PuDrawer with named composition slots and use it as the web PuPicker
  overlay shell.
- 40b1617: Enhance PuFormItem with field labels, required markers, helper text, manual
  error text, label trailing content, and custom control wrapping.
- fca3bba: Refresh PuInput as a web-only field control with field variants, semantic sizes,
  and an outline shell aligned with the frontend input visual direction.
- 3417fb4: Refresh PuTextarea as a web-only field control with normalized size, variant,
  and tone props, and make focused border color follow tone.

## 0.2.1

### Patch Changes

- Add PuToggleSwitch size support with sm, md, and lg values mapped to caption,
  control, and body typography.

## 0.2.0

### Minor Changes

- 6c187e2: Add PuDialog as an opinionated confirmation and short-workflow dialog with
  structured header, body, footer, action slots, focus management, and overlay
  dismissal events.
- 1933e4b: Add PuSpinner as a public loading indicator primitive that inherits
  currentColor and supports accessible status labeling.
- 0e43d2b: Add PuSnackbar and PuSnackbarHost for transient toast/snackbar feedback.
- 0394d38: Redesign PuButton as the unified action primitive with shared structured native,
  href, and route action targets plus canonical tone, variant, shape, size, and
  feedback props.
- 234eb1f: Enhance PuCard with shared action targets, selectable/active/disabled card
  semantics, and reusable expandable policy state; add PuChipGroup fit-to-width
  measurement and PuImg fallback slot, shape, and border support.

### Patch Changes

- 1bac1e4: Align PuButton interaction states with the Material state model. Non-ghost
  buttons now use a content-colored state layer for hover, focus, and active
  feedback, while ghost buttons keep hover and active feedback on content opacity
  instead of adding a background layer.
- 0218d52: Correct PuDescriptionItem internal layout so list grid mode no longer leaks
  into item classes. Items now normalize to stack or inline internally: inline
  items keep label-value columns across viewport sizes, carry inline padding,
  center simple rows vertically, and default values to end alignment. Stack items
  keep suffix and action content in the label row, while inline items treat suffix
  or action as the definition value instead of appending it after a separate
  value.
- 1933e4b: Update the web `pu-icon` mixin to use an explicit em-based icon scale of
  `1.25em`, `1.5em`, and `2.5em`, and document that the scale is proportional to
  surrounding text rather than rem token sizing.
- 5af6d26: Update PuTabs and PuTab to use value-based tab items with shared sizing,
  keyboard navigation, active tab scrolling, an append slot, and a pill tab
  presentation while preserving the original text-only default tab styling.

## 0.1.1

### Patch Changes

- Reduce default typography token weights for hero, title, section, and control roles.

## 0.1.0

### Patch Changes

- Initial release of `@partner-up-dev/design-web`.
