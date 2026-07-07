# PartnerUp Web Design Style Foundation

This is the current style base for `@partner-up-dev/ui-web`. It is a
working description, not a finished brand manifesto. Use it to make local
component decisions until the package has a more formal visual language.

## Starting Affinities

- Color follows a Material Design 3-like semantic model: tonal palettes,
  explicit surface roles, and named intent roles such as primary, secondary,
  tertiary, error, warning, outline, and inverse surface.
- Shape and typography lean closer to a Windows Metro-like discipline:
  rectangular composition, restrained text hierarchy, light decoration, and
  preference for clarity over soft ornament.
- These affinities are references, not ownership. PartnerUp Web should be
  described through its own tokens, component vocabulary, and repeatable
  constraints.

## Style Base

<!-- agent-skill:start -->
# Design Style Foundation

PartnerUp Web is a flat, rectilinear, token-driven interface system with
semantic color depth and quiet typography.

- Color is semantic before decorative. Components should express intent through
  `tone`, status tone, `surfaceLevel`, and variant tokens rather than local
  one-off colors.
- Shape defaults to rectangular. A bounded component with a shape option should
  default to `shape="rect"` and render square corners by default.
- Roundness is explicit. Use `pill` and `circle` only for shape props, intrinsic
  circular controls, avatars/media masks, knobs, spinner geometry, or other
  documented component affordances.
- Content surfaces should separate levels through color, border, spacing, and
  layout before relying on radius or shadow.
- Shadow is reserved for necessary elevation: use it only when a surface needs
  visible z-axis separation, protection from a competing background, or extra
  focus as an elevated element. Do not use shadow for ordinary active,
  selected, hover, or in-track control states; prefer semantic color, border,
  surface level, spacing, and layout.
- Text should stay calm: low to moderate weights, direct labels, no decorative
  letter spacing, and hierarchy from existing typography tokens.
- Motion should be brief and functional. Prefer subtle state transitions over
  springy or ornamental movement.

## Token Interpretation

The current radius token map already contains the intended split:

- `--sys-radius-none` is the canonical rectangular shell default when a
  component does not expose a shape option.
- `--sys-radius-xsmall` and `--sys-radius-small` are compatibility aliases for
  older square-corner component internals. Today they resolve to `0`, but new
  default shells should not rely on those aliases to express intent.
- `--sys-radius-medium` and `--sys-radius-large` are exception or transition
  tokens. Do not use them for default content containers without a component
  decision.
- `--sys-radius-pill` and `--sys-radius-full` are explicit rounded forms. They
  should be attached to `shape="pill"`, `shape="circle"`, or an intrinsic
  circular primitive.

Do not mass-change the token values as a first repair step. Changing
`medium`/`large` globally would alter published CSS variables and overlay
surfaces at once. Prefer component-level alignment first, then revisit token
semantics after the component surface is consistent.

## Elevation And Shadow

PartnerUp Web follows the Material Design 3 elevation principle that shadow is a
depth cue, not a default surface decoration. Use shadow when it clarifies a real
vertical relationship between surfaces, such as dialogs, drawers, floating
panels, snackbars, menus, or elements that must remain visually protected from a
busy background.

Avoid shadow when the UI is only expressing component state. Active cards,
selected items, thumb positions inside a track, hover affordances, and
validation states should use the local component vocabulary first: color,
border, outline, surface role, typography, spacing, or motion. A shadow in those
cases falsely implies elevation where the interaction is only state.

## Component Rules

- New components with a shape option default that option to `rect`.
- New components without a shape option use `--sys-radius-none` for their
  default shell.
- If a component exposes `shape`, `rect` is the default and should map to
  `--sys-radius-none`. Existing `square`, `xsmall`, or `small` usage should be
  treated as compatibility vocabulary, not the canonical default.
- `pill` must map to `pill`; `circle` must map to `full` and should only be
  available for square surfaces.
- If a component needs a rounded default, document why in the component docs or
  a package design note.
- Story-only helper surfaces may use local radius for demonstration layout, but
  story styling must not become component precedent.
- Generated skill references should describe stable public behavior after the
  implementation settles; do not hand-edit generated files for temporary style
  reasoning.
<!-- agent-skill:end -->

## Open Style Questions

- Overlay shells: dialogs and modals follow the square-corner default. Drawers
  and wheel pickers still need a decision about whether their platform
  affordances justify softer chrome.
- Upload surfaces: drag/drop and file item controls mix rectangular shells with
  rounded action affordances. They need a focused pass because they contain many
  nested surfaces.
- Public compatibility: some shape or variant changes may affect visual output
  without changing TypeScript APIs. Treat broad visual corrections as
  release-worthy package changes.
