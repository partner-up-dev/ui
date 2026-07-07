# Implementation Record

## Summary

Implemented the local `design` to `ui` rename across package identity,
generated web skill identity, consumer documentation, migration guides, dev
route naming, and release metadata.

Repository rename from `partner-up-dev/design` to `partner-up-dev/ui` and local
`origin` remote update were completed after local verification.

## Changed Surfaces

- Root package: `@partner-up-dev/ui`.
- Web package: `@partner-up-dev/ui-web`.
- UniApp package: `@partner-up-dev/ui-uniapp`.
- Package repository metadata now points at `https://github.com/partner-up-dev/ui.git`.
- Root and package dev scripts use the `ui-web` portless identity.
- Generated web skill output moved from `packages/web/skills/design-web/` to
  `packages/web/skills/ui-web/`.
- Web generated component types now import from `@partner-up-dev/ui-web`.
- Web UnoCSS preset now exposes `partnerUpUiPreset` as the preferred API.
- `partnerUpDesignPreset` and related `partnerUpDesign*Safelist` exports were
  removed instead of kept as compatibility aliases.
- Package README and MIGRATION files document the new install/import names.
- A Changesets entry records the package rename for the release flow.
- GitHub repository is now `partner-up-dev/ui`.
- Local `origin` now points at `ssh://git@github.com/partner-up-dev/ui`.

## Intentionally Preserved

- `Pu*` component names.
- `packages/web` and `packages/uniapp` directory names.
- Design-system domain language such as design tokens, design style foundation,
  and design system concepts.
- Historical task and changelog records that describe old package names at the
  time they were written.

## Verification

Passed:

- `node --check scripts/ensure-dev-servers.mjs`
- `node --check packages/web/scripts/generate-agent-skill.mjs`
- `node --check packages/web/scripts/check-packed-consumer-types.mjs`
- `pnpm install --lockfile-only`
- `pnpm changeset status --verbose`
- `pnpm --filter @partner-up-dev/ui-web run generate:check`
- `pnpm --filter @partner-up-dev/ui-web run skill:generate:check`
- `pnpm --filter @partner-up-dev/ui-web run verify`
- `pnpm --filter @partner-up-dev/ui-uniapp run build`
- `pnpm run build`
- `gh repo view partner-up-dev/ui --json nameWithOwner,url`
- `git ls-remote origin HEAD`

Known failure:

- `pnpm --filter @partner-up-dev/ui-uniapp run type-check` fails on existing
  UniApp type-check issues. The first error is inability to resolve `vue`,
  followed by broad Vue template-property errors. This failure predates the
  package identity rename shape and is not fixed in this task.

Residual old identity references are limited to migration/change records,
historical changelog entries, and historical task records.
