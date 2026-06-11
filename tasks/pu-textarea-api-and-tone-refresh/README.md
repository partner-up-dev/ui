# PuTextarea API And Tone Refresh

## State

Complete.

## Request

Apply the same web-package cleanup direction used for `PuInput` to
`PuTextarea`:

- Treat `PuTextarea` as a web DOM field control, not a UniApp-compatible facade.
- Normalize public API around field vocabulary such as `size`, `variant`, and
  `tone`.
- Reuse the shared field variant vocabulary introduced for `PuInput`.
- Keep the visual refresh intentionally narrow: only fix active/focused border
  color so it follows the selected tone rather than a hardcoded or unintended
  black color.
- Create a new task packet for this work.

## Scope

- `packages/web/src/components/puTextarea/`
- `packages/web/src/stories/forms/PuTextarea.story.vue`
- `packages/web/src/stories/forms/PuForm.story.vue` if the new API affects form
  examples
- `packages/web/skill.seed.json`
- generated component registry, types, and design-web skill references when
  public API docs change
- `.changeset/` if package public API or runtime behavior changes

Out of scope:

- `packages/uniapp/`
- Reworking the full `PuTextarea` visual shell to match `mvp-HA`
- Aligning `PuTextarea` capabilities or API to `mvp-HA`
- Backward compatibility shims for unpublished API

## Initial Findings

- `PuTextarea` still imports `PuContainerVariant` and uses
  `plain | soft | outline | solid`; this diverges from the new
  `PuFieldVariant = line | borderless | outline` vocabulary used by `PuInput`.
- `PuTextarea` still exposes UniApp-oriented props such as `confirmType`,
  `showConfirmBar`, `holdKeyboard`, `cursorSpacing`, `adjustPosition`, `fixed`,
  and `disableDefaultPadding`.
- `PuTextarea` still emits UniApp-style or compatibility-oriented events such as
  `input`, `confirm`, and `linechange`.
- `PuTextarea` still exposes pixel height controls through `height` and
  `focusHeight`, while `PuInput` has moved to semantic `size`.
- Current focused CSS is hardcoded to `primary` in the checked-in source. The
  reported black active border is likely either a token resolution/fallback issue
  or a variant-state mismatch; implementation should verify this against the
  rendered story before finalizing.

## Design Claims

- `PuTextarea` should follow `PuInput` for shared field-control vocabulary:
  `size`, `variant`, `tone`, `invalid`, `disabled`, `readonly`, and
  `showCount` should mean the same things across both controls.
- `PuTextareaVariant` should alias `PuFieldVariant`, not `PuContainerVariant`.
- `tone` should drive focused border color. Validation remains separate through
  `invalid`, which should override tone with the error color.
- `size` should map typography and spacing, not arbitrary pixel height:
  - `sm` -> `caption`
  - `md` -> `control`
  - `lg` -> `body`
- The default visual treatment should stay conservative. Do not restyle the
  whole textarea shell unless required to express the normalized API.
- The web component should emit native web events for `focus` and `blur`, plus
  `update:modelValue`. It should not preserve UniApp event names or detail
  payload compatibility.

## Proposed API Direction

```ts
type PuTextareaSize = PuSize;
type PuTextareaVariant = PuFieldVariant;
type PuTextareaTone = PuTone;
```

Default proposal:

```ts
size: "md"
variant: "borderless"
tone: "neutral"
```

Default note:

- `borderless` preserves the current textarea's no-frame default more closely.
  Unlike `PuInput`, `PuTextarea` is not taking on a broader visual shell refresh
  in this task.

Likely kept props:

- `modelValue`
- `id`
- `name`
- `placeholder`
- `maxlength`
- `showCount`
- `autoHeight`
- `disabled`
- `readonly`
- `invalid`
- `size`
- `variant`
- `tone`

Removal candidates:

- UniApp/mobile keyboard props: `focus`, `confirmType`, `showConfirmBar`,
  `holdKeyboard`, `cursorSpacing`, `adjustPosition`, `fixed`,
  `disableDefaultPadding`
- Pixel height props: `height`, `focusHeight`
- Compatibility emits: `input`, `confirm`, `linechange`

## Implementation Slices

1. Normalize props and emits.
   - Import `puFieldVariants`, `puSizes`, and `puTones`.
   - Add `size`, `variant`, `tone`, and `invalid`.
   - Remove UniApp-oriented props and compatibility emits.

2. Adjust the Vue implementation.
   - Use native textarea input events and plain string model updates.
   - Keep auto-height if it remains valuable for web, but make it internal
     behavior rather than a UniApp `linechange` compatibility surface.
   - Add native `id`, `name`, `aria-invalid`, and class hooks aligned with
     `PuInput`.

3. Repair focused border color.
   - Define a textarea focus color CSS variable from `tone`.
   - Ensure focused/active state uses that variable.
   - Ensure `invalid` overrides tone with the error color.
   - Avoid broad mvp-HA visual restyling.

4. Update stories and generated docs.
   - Show controlled, sizes, field variants, tones/focus, auto-height, count,
     disabled/readonly, and invalid state.
   - Remove story usage of removed UniApp props/events.
   - Update `skill.seed.json` and regenerate the design-web skill.

5. Verify.
   - `pnpm --filter @partner-up-dev/design-web run generate`
   - `pnpm --filter @partner-up-dev/design-web run skill:generate`
   - `pnpm --filter @partner-up-dev/design-web run type-check`
   - `pnpm --filter @partner-up-dev/design-web run story:coverage`
   - `pnpm --filter @partner-up-dev/design-web run build`
   - `pnpm --filter @partner-up-dev/design-web run story:build`
   - `pnpm --filter @partner-up-dev/design-web run verify`

## Resolved Questions

- `autoHeight` remains as web-only behavior without emitting `linechange`.
- `rows` is not added in this slice. Min-height stays token/CSS driven for now.
- The default remains visually close to the current textarea through
  `variant="borderless"` rather than adopting `PuInput`'s broader outline
  default.

## Non-Goals

- Do not touch the UniApp package.
- Do not preserve unpublished backward compatibility.
- Do not restyle the complete textarea shell beyond what the normalized API and
  active border tone repair require.

## Implementation Record

Completed on 2026-06-11.

Implemented decisions:

- Switched `PuTextareaVariant` from container variants to shared field variants.
- Added `size`, `tone`, `invalid`, `id`, and `name` to the web textarea API.
- Removed UniApp-oriented props and compatibility emits from web `PuTextarea`.
- Removed pixel `height` and `focusHeight` props.
- Kept `autoHeight` as web-only internal layout behavior without `linechange`.
- Defaulted `variant` to `borderless` to avoid broad visual churn.
- Removed native textarea focus outline from the inner control so active border
  is owned by the package shell.
- Made focused border color follow `tone`, with `invalid` overriding to error.
- Updated stories and skill seed for the normalized API.
- Regenerated design-web skill references.
- Added `.changeset/refresh-pu-textarea-api.md`.

Verification:

- `pnpm --filter @partner-up-dev/design-web run generate`
- `pnpm --filter @partner-up-dev/design-web run skill:generate`
- `pnpm --filter @partner-up-dev/design-web run type-check`
- `pnpm --filter @partner-up-dev/design-web run build`
- `pnpm --filter @partner-up-dev/design-web run story:coverage`
- `pnpm --filter @partner-up-dev/design-web run story:build`
- `pnpm --filter @partner-up-dev/design-web run verify`
- `git diff --check`
