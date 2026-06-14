# Web Form Capabilities Task Packet

## Status

Explore / Solidify. No package source changes have been made.

## Purpose

Enhance reusable form capabilities in `packages/web` so downstream admin and
editor forms can migrate away from native controls without losing type safety,
native browser behavior, accessibility, or dense workflow ergonomics.

This packet is upstream input for `@partner-up-dev/design-web`; it is not an
app-side migration contract.

## Request

Evaluate form capability needs reported by:

```text
F:/CODING/Project/Anana/mvp-HA/tasks/design-web-package-integration/deep-ui-refactor/50-form-capability-needs.md
```

Create a task packet and state how `packages/web` form capabilities should be
enhanced.

## Scope

In scope:

- `PuInput` numeric, constraint, datalist, and change-event capability.
- Dedicated numeric input or helper capability.
- `PuForm` native form attribute and external submit contract.
- Field accessibility wiring across `PuFormItem` and field controls.
- `PuTextarea` sizing and resize contract.
- Web-native select and free-text suggestion capability discovery.
- Histoire stories and generated design-web skill references when public API
  changes.

Out of scope:

- `packages/uniapp` unless a later cross-package contract explicitly requires
  it.
- A schema-driven form framework.
- App-side migration implementation.
- Changesets for this task-packet-only update.

## Decision Frame

- Prefer native web DOM semantics where browser behavior is desired.
- Keep `PuFormItem` responsible for label, hint, required marker, and visible
  field errors.
- Keep field vocabulary aligned with existing `size`, `variant`, `tone`,
  `invalid`, `disabled`, and `readonly`.
- Treat picker, select, and autocomplete as distinct interaction models.
- Preserve app ownership of validation timing, mutation state, and submit
  pending behavior unless repeated product pressure proves a package-level
  abstraction.

## Recommended Direction

1. Add dedicated numeric model support instead of widening `PuInput` globally.
   Prefer `PuNumberInput` or an equivalent helper with
   `modelValue: number | null`, explicit empty handling, and deliberate invalid
   intermediate text behavior.
2. Add typed native constraint forwarding for `min`, `max`, and `step` where
   native input types accept them.
3. Add a field accessibility bridge: generated message ids, documented
   `aria-describedby` / `aria-invalid` wiring, and accessible labels for
   built-in clear/password/icon buttons.
4. Document and expose the `PuForm` native form contract, including external
   submit buttons.
5. Add `PuSelect` as a general web-native select capability. It should serve
   normal product forms and admin editors; start from native `<select>`
   semantics unless design requirements force a custom listbox.
6. Add a low-risk datalist path first. Escalate to `PuAutocomplete` /
   `PuCombobox` only if the app needs custom rendering, async filtering, or
   richer keyboard behavior.
7. Add textarea sizing controls and committed-change guidance after the higher
   migration blockers are solved.

## Files

```text
README.md
+-- packet entry, purpose, scope, and recommended direction

capability-inventory.md
+-- current package baseline, evidence, and gap matrix

implementation-plan.md
+-- proposed slices, target files, open questions, and non-goals

api-design.md
+-- proposed PuNumberInput and PuSelect public API contracts

verification-matrix.md
+-- verification commands and acceptance gates for future source changes

implementation-record.md
+-- pending record for implemented decisions, touched files, and verification
```
