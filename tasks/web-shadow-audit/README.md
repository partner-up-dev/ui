# Web Shadow Audit Task Packet

## State

Complete. Follow-up implementation applied.

## Request

Scan `packages/web` components and report which components enable shadows and
what each shadow is for.

Follow-up decision:

- `PuCard.is-active` should not use `box-shadow`; active state is not elevation.
- `PuMultiStopToggle` thumb should not use `box-shadow`; the thumb sits inside a
  track and should read through local contrast rather than z-axis elevation.
- Package style guidance should state that shadows are reserved for necessary
  vertical separation, focus, or background protection, aligned with Material
  Design 3 elevation guidance.

## Scope

- Source scan only: `packages/web/src/components`.
- Excluded generated or dependency output such as `packages/web/dist`,
  `packages/web/node_modules`, and `packages/web/.histoire`.
- Component-level report only. Shared token and utility definitions are noted as
  supporting context, not counted as components.

## Method

Commands used from repository root:

```bash
rg -n "box-shadow|drop-shadow|text-shadow|filter:\s*drop-shadow|--[^;]*shadow|shadow" packages/web --glob '!dist/**' --glob '!node_modules/**'
rg -n "box-shadow\s*:|filter:\s*drop-shadow|text-shadow\s*:|shadow-[0-9]|elevation-[0-9]|fn\.sys-var\(shadow|var\(--sys-shadow" packages/web/src/components packages/web/src/stories --glob '!dist/**'
rg -n "@include\s+elevation|shadow-[0-9]|elevation-" packages/web/src --glob '!dist/**'
```

The scan found no component template usage of `shadow-*` or `elevation-*`
utility classes, and no component usage of `drop-shadow` or `text-shadow`.

## Findings

| Component | Source | Shadow | Purpose |
| --- | --- | --- | --- |
| `PuFilesUpload` | `packages/web/src/components/puFilesUpload/puFilesUpload.scss:62` | `box-shadow: 0 0 0 2px color-mix(in srgb, var(--sys-color-primary) 24%, transparent)` on drag-active dropzone | Drag-active affordance ring. It highlights that the dropzone can accept the file being dragged. This is a state outline, not depth/elevation. |
| `PuFilesUpload` | `packages/web/src/components/puFilesUpload/puFilesUpload.scss:326` | Same 2px primary mixed ring on drag-active inline control | Same drag-active affordance for the inline layout. It keeps the compact file control behavior aligned with the full dropzone variant. |
| `PuImgCropper` | `packages/web/src/components/puImgCropper/puImgCropper.scss:50` | `box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5)` on crop mask | Masking technique. The huge spread darkens everything outside the crop window while leaving the crop area visible. This is not elevation. |
| `PuSnackbar` | `packages/web/src/components/puSnackbar/puSnackbar.scss:15` | `box-shadow: fn.sys-var(shadow, 3)` | Floating notification elevation. It separates the snackbar from page content while keeping the elevation moderate. |
| `PuDrawer` | `packages/web/src/components/puDrawer/puDrawer.scss:20` | `box-shadow: fn.sys-var(shadow, 8)` | High overlay elevation for the drawer sheet. It visually separates the drawer surface from the dimmed page underneath. |
| `PuFloatPanel` | `packages/web/src/components/puFloatPanel/puFloatPanel.scss:22` | `box-shadow: var(--sys-shadow-8)` | High overlay elevation for the floating/bottom panel. It communicates that the panel sits above the underlying content. |
| `PuDialog` | `packages/web/src/components/puDialog/puDialog.scss:31` | `box-shadow: var(--sys-shadow-3)` | Dialog elevation. It gives the dialog body a physical surface above the overlay without making it as heavy as drawer-style sheets. |

Previously found and removed:

| Component | Previous source | Previous shadow | Removal rationale |
| --- | --- | --- | --- |
| `PuMultiStopToggle` | `packages/web/src/components/puMultiStopToggle/puMultiStopToggle.scss:84` | `box-shadow: var(--sys-shadow-1)` on thumb | The thumb is an in-track state marker, not an elevated surface. |
| `PuCard` | `packages/web/src/components/puCard/puCard.scss:54` | `box-shadow: 0 0 0 1px var(--sys-color-primary)` on `.is-active` | Active state should not imply z-axis elevation. |

## Shadow Categories

### Depth / Elevation

These shadows use the package elevation tokens and imply layered surfaces:

- `PuSnackbar`: `shadow-3`
- `PuDialog`: `shadow-3`
- `PuDrawer`: `shadow-8`
- `PuFloatPanel`: `shadow-8`

The pattern is coherent: transient overlays and floating surfaces get tokenized
elevation.

### State Ring

These use `box-shadow` as an outside outline because it does not affect layout:

- `PuFilesUpload` drag-active states

These should be discussed as state affordances rather than visual depth.

### Mask

`PuImgCropper` uses a large-spread `box-shadow` to build the crop overlay. This
is a practical CSS masking pattern, not a visual elevation pattern.

## Non-Counted Shadow Mentions

The following files mention `box-shadow` but do not enable a shadow in the
current CSS state:

- `packages/web/src/components/puButton/puButton.scss`: includes `box-shadow`
  in transitions and sets disabled state to `box-shadow: none`.
- `packages/web/src/components/puCheckbox/puCheckbox.scss`: includes
  `box-shadow` in checkbox box transitions, with no active shadow declaration.
- `packages/web/src/components/puInput/puInput.scss`: includes `box-shadow` in
  field shell transitions, with focus handled by `outline`.
- `packages/web/src/components/puNumberInput/puNumberInput.scss`: same field
  shell transition pattern as `PuInput`.
- `packages/web/src/components/puChipsEditor/puChipsEditor.scss`: same field
  shell transition pattern as `PuInput`.
- `packages/web/src/components/puSelect/puSelect.scss`: same field shell
  transition pattern as `PuInput`.
- `packages/web/src/components/puFilesUpload/puFilesUpload.scss`: transitions
  `box-shadow` on dropzone and inline control; only drag-active states enable
  the ring.

These transition-only mentions look like a shared animation vocabulary for
future or conditional state treatments. They should not be counted as enabled
shadows unless a non-`none` `box-shadow` declaration exists for the component.

## Supporting Token Surface

`packages/web/src/styles/_ref.scss` defines shadow levels `0`, `1`, `2`, `3`,
`4`, `6`, `8`, `12`, `16`, and `24`.

`packages/web/src/styles/_mixins.scss` exposes:

```scss
@mixin pu-elevation($level) {
  box-shadow: var(--sys-shadow-#{$level});
}
```

`packages/web/src/styles/unocss-preset.ts` maps `elevation-(n)` utilities to
`box-shadow`, but the component scan did not find current component usage of
those utilities.

## Product Design Read

The current shadow usage is restrained. It is not used for ordinary cards or
form fields. Enabled elevation shadows are attached to overlays and floating
surfaces.

The only naming ambiguity is that several non-depth effects are implemented via
`box-shadow`: file drag rings and cropper mask. When auditing or refactoring the
visual language, those should be separated from elevation tokens because their
purpose is state or masking, not surface depth.

## Implementation Record

- Removed `box-shadow` from `PuCard.is-active`.
- Removed now-unused `box-shadow` transition and disabled reset from `PuCard`.
- Removed `box-shadow` from `PuMultiStopToggle` thumb.
- Added explicit shadow/elevation guidance to
  `packages/web/docs/design-style-foundation.md`.
- Regenerated design-web skill references with
  `pnpm --filter @partner-up-dev/design-web run skill:generate`.
