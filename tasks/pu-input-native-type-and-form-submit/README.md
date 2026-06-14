# PuInput Native Type And PuForm Submit

## State

Complete.

## Request

Fix two reported web package form gaps:

- `PuInput` should support browser-native date/time input types, especially
  `datetime-local`.
- `PuForm` should expose an explicit `submit` event.

## Decisions

- Replace the public `PuInput` `type` prop with `nativeType` to clarify that
  the value maps to the underlying HTML input `type` attribute.
- Keep `nativeType` as a narrowed union. Do not accept arbitrary strings,
  because input kinds such as `file`, `range`, `checkbox`, and `radio` are not
  the current `PuInput` control boundary.
- Add native string-valued date/time types: `date`, `time`, `datetime-local`,
  `month`, and `week`.
- Change web `PuForm` to render a native `form` root, prevent default browser
  submission in the component, and emit `submit(event: SubmitEvent)`.
- Leave validation opt-in through the exposed `validate()` method; a submit
  handler can decide whether and when to call it.

## Target Files

- `packages/web/src/components/puInput/puInput.ts`
- `packages/web/src/components/puInput/puInput.vue`
- `packages/web/src/components/puForm/puForm.ts`
- `packages/web/src/components/puForm/puForm.vue`
- `packages/web/src/stories/forms/PuInput.story.vue`
- `packages/web/src/stories/forms/PuForm.story.vue`
- generated design-web skill references
- changeset metadata

## Verification

Passed:

- `pnpm --filter @partner-up-dev/design-web run skill:generate`
- `pnpm --filter @partner-up-dev/design-web run type-check`
- `pnpm --filter @partner-up-dev/design-web run verify`
