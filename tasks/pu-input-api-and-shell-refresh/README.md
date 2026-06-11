# PuInput API And Shell Refresh

## State

Complete.

## Request

Evaluate and plan a `PuInput` refresh for the web design-system package:

- Add multiple sizes that map to the three typography levels needed by field
  controls.
- Normalize the public API around field-appropriate design-system vocabulary
  such as `variant`, `tone`, and `size`.
- Rework the visual shell toward the `mvp-HA` frontend input primitive.
- Remove UniApp-style events and UniApp-oriented API from the web package's
  `PuInput`.
- Treat this as a pre-release breaking cleanup. The package has not been
  published, so no backward compatibility shim is required.

## Scope

- `packages/web/src/components/puInput/`
- `packages/web/src/stories/forms/PuInput.story.vue`
- `packages/web/skill.seed.json`
- generated component registry, types, and design-web skill references when
  public API docs change
- nearby contracts that need alignment checks:
  - `packages/web/src/components/puFormItem/`
  - `packages/web/src/components/puTextarea/`
  - `packages/web/src/types/variants.ts`

Out of scope:

- `packages/uniapp/`
- Cross-package API parity with UniApp.
- Matching `mvp-HA` input capabilities or API. `mvp-HA` is only a visual style
  reference for the field shell.
- Preserving the current unpublished `PuInput` API.

## Reference Inputs

- `packages/web/src/components/puInput/puInput.ts`
- `packages/web/src/components/puInput/puInput.vue`
- `packages/web/src/components/puInput/puInput.scss`
- `packages/web/src/components/puButton/puButton.ts`
- `packages/web/src/types/variants.ts`
- `F:/CODING/Project/Anana/mvp-HA/apps/frontend/src/shared/ui/forms/TextInput.vue`
- `F:/CODING/Project/Anana/mvp-HA/apps/frontend/src/shared/ui/forms/FormField.vue`
- `F:/CODING/Project/Anana/mvp-HA/apps/frontend/src/shared/ui/forms/TextareaInput.vue`
- `F:/CODING/Project/Anana/mvp-HA/apps/frontend/src/shared/ui/AGENTS.md`

## Current Findings

- Current `PuInput` has no public `size` prop. It only exposes `height`, which
  changes the input element height but not typography, padding, icon size, or
  field density.
- Current `PuInput` hardcodes both label and input text to `control`
  typography. Count and error text use `caption`.
- The token set already has three relevant typography levels for this problem:
  `caption`, `control`, and `body`.
- `PuButton` already uses canonical control vocabulary from
  `packages/web/src/types/variants.ts`; `PuInput` does not. Field controls may
  need their own variant vocabulary rather than reusing button/container
  treatment names directly.
- `mvp-HA` `TextInput` is visually simpler and more form-native: full-width
  control, transparent background, outline border, small padding, xsmall radius,
  primary focus outline, placeholder opacity, and no built-in label shell.
- `mvp-HA` separates field structure into `FormField`: label, required marker,
  hint, and error live outside the input primitive.
- Design-web already has `PuFormItem`, so the refresh should not blindly copy
  `mvp-HA` composition boundaries into `PuInput`. The web package should decide
  its own field-control boundary.
- Current `PuInput` includes UniApp-style props/events such as cursor spacing,
  keyboard height, confirm behavior, selection fields, and detail-object event
  payloads. These should be removed from the web package component rather than
  preserved.

## Design Claims

- `PuInput` should become a normalized web field control. Compatibility with
  UniApp-style input semantics is not a goal for the web package.
- `size` should be semantic control size, not an arbitrary pixel height.
  Proposed mapping:
  - `sm` -> `caption`
  - `md` -> `control`
  - `lg` -> `body`
- `height` should be removed from the public API. Sizing should come from the
  semantic `size` prop and token-backed CSS.
- `variant` should own the visual treatment of the input shell, but existing
  common variants may not name field treatments precisely enough. Field controls
  likely need a dedicated variant set.
- `tone` should own semantic color emphasis, but validation should remain a
  separate invalid/error state. A consumer should not need `tone="danger"` just
  to show validation failure.
- `shape` should not be forced into the first API slice. The first implementation
  can be rect-only because the current common shape vocabulary is not designed
  specifically for form fields.
- Prefix/suffix, clear, password toggle, word count, disabled, readonly, and
  model updates are web-package behavior candidates. UniApp-compatible event
  names, payloads, and mobile keyboard props should be removed.
- Label/hint/error ownership needs an explicit decision. The cleaner long-term
  direction is `PuFormItem` for field chrome and `PuInput` for the control
  shell. Because the package is unpublished, current `label`, `required`,
  `error`, and `errorMessage` props can be removed if that boundary is accepted.

## Proposed API Direction

```ts
type PuInputSize = "sm" | "md" | "lg";
type PuInputTone = "neutral" | "primary" | "secondary" | "tertiary" | "danger";

type PuFieldVariant = "line" | "borderless" | "outline";
type PuInputVariant = PuFieldVariant;
```

Default proposal:

```ts
size: "md"
variant: "line"
tone: "neutral"
```

Variant mapping proposal:

- `line`: current default shell, with bottom border only. This is the current
  `noBorder: false` behavior.
- `borderless`: current no-border shell. This is the current `noBorder: true`
  behavior.
- `outline`: bounded field shell visually aligned with `mvp-HA` `TextInput`.

Vocabulary note:

- Avoid naming the above set `plain | soft | outline` unless the package adopts
  field-specific definitions for those names. In the current broader design
  vocabulary, `soft` usually implies a filled or softened surface treatment, not
  "no border".
- Add a dedicated shared type such as `PuFieldVariant` in
  `packages/web/src/types/variants.ts`. Prefer `PuFieldVariant` over
  `PuFormItemVariant` because the values describe the visual shell used by field
  controls, not only the `PuFormItem` wrapper.
- `PuFormItemVariant` would be appropriate only if the field wrapper, rather
  than `PuInput`/`PuTextarea`, owns the rendered shell treatment.

API cleanup notes:

- Remove `noBorder`; replace with `variant="borderless"`.
- Remove `height`; sizing comes from `size`.
- Remove `customInputClass` and `customLabelClass` unless a concrete extension
  need remains after the field boundary is simplified.
- Do not keep UniApp-specific props/events in the normalized web API.

Removal candidates:

- Props: `height`, `cursorSpacing`, `adjustPosition`, `cursor`,
  `selectionStart`, `selectionEnd`, `confirmType`, `confirmHold`,
  `holdKeyboard`, `alwaysEmbed`, `noBorder`.
- Ad hoc styling hooks: `customInputClass`, `customLabelClass`.
- Emits: `input`, `confirm`, `keyboardheightchange`, and detail-object web
  facsimiles for focus/blur.
- Documentation caveat: remove the claim that `PuInput` includes
  UniApp-compatible input props and legacy event names.

## Implementation Slices

1. Solidify the contract.
   - Confirm exact `size` to typography/height/padding/icon mapping.
   - Add shared `PuFieldVariant` unless the implementation proves the variant is
     truly `PuInput`-only.
   - Decide label/error ownership and migration notes.

2. Implement normalized props.
   - Add typed props and validated classes for `size`, `variant`, and `tone`.
   - Remove UniApp-specific web props and emits.
   - Remove `height`.
   - Remove `noBorder`; use `variant="borderless"`.
   - Remove ad hoc styling hooks unless they remain justified by a supported
     extension story.

3. Rework the shell CSS.
   - Move from underline-only default toward a bounded field shell visually
     inspired by `mvp-HA` `TextInput`.
   - Ensure focus, disabled, readonly, invalid, prefix/suffix, clear, password,
     count, and placeholder states are covered.
   - Make sizing change typography, min-height, padding, icon size, and count
     placement coherently.

4. Update stories and docs.
   - Add Histoire variants for size, field variant, tone, invalid, disabled,
     prefix/suffix, count, and FormItem composition.
   - Update `skill.seed.json` and regenerate design-web skill references.

5. Verify.
   - `pnpm --filter @partner-up-dev/design-web run generate`
   - `pnpm --filter @partner-up-dev/design-web run skill:generate`
   - `pnpm --filter @partner-up-dev/design-web run type-check`
   - `pnpm --filter @partner-up-dev/design-web run story:coverage`
   - `pnpm --filter @partner-up-dev/design-web run build`
   - `pnpm --filter @partner-up-dev/design-web run story:build`

## Open Questions

- Should the default visual treatment remain `line` for continuity or change to
  `outline` for product parity with `mvp-HA`?
- Should `PuInput` continue to own `label` and `errorMessage`, or should those
  move fully to `PuFormItem` composition?
- Should `size="lg"` map to `body` even though most form controls currently use
  `control`, or should `body` be reserved for product-local inputs?
- Should `PuFieldVariant` use `line | borderless | outline`, or is there a
  better field-shell naming set?
- Should `input` be removed entirely in favor of `update:modelValue`, or kept as
  a web-native convenience event with a plain string payload?

## Non-Goals

- Do not touch UniApp package behavior.
- Do not align `PuInput` capabilities or API to `mvp-HA`; only align the visual
  shell direction.
- Do not add a changeset for task-packet-only edits.

## Implementation Record

Completed on 2026-06-11.

Implemented decisions:

- Added shared `PuFieldVariant = "line" | "borderless" | "outline"` to the web
  variant vocabulary.
- Refreshed `PuInput` as a web-only field control.
- Removed UniApp-oriented props and emits from web `PuInput`.
- Removed `height`, `noBorder`, label/error shell props, and ad hoc input/label
  class hooks from `PuInput`.
- Added `size`, `variant`, `tone`, `align`, `invalid`, native web input
  attributes, prefix/suffix slots, clear, password visibility, and count support.
- Defaulted `PuInput` to the bounded `outline` shell aligned with the `mvp-HA`
  `TextInput` visual direction.
- Moved story label/error examples to `PuFormItem`.
- Regenerated design-web skill references from `skill.seed.json`.
- Added `.changeset/refresh-pu-input-api.md`.

Verification:

- `pnpm --filter @partner-up-dev/design-web run verify`
