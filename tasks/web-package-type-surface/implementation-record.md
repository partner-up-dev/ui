# Implementation Record

Date: 2026-06-12

## Decision

Use a root-only public component API for the web package.

Implemented behavior:

- Component values import from `@partner-up-dev/design-web`.
- Shared types and component helper types import from
  `@partner-up-dev/design-web`.
- `./components/*` is removed from `packages/web/package.json` exports.
- `src/components` is removed from package `files`.
- Vue `GlobalComponents` declarations are generated from public root component
  exports, not raw `src/components/*.vue` files.

## Source Changes

Package surface:

- `packages/web/package.json`
  - removed `./components/*`
  - removed `src/components` from `files`
  - added `check:packed-types`
  - added the packed type check to `verify`
- `packages/web/src/index.ts`
  - exports the generated `version`
  - no longer imports or re-exports `../types/components`
- `packages/web/src/version.ts`
  - generated from `packages/web/package.json`
- `packages/web/tsconfig.build.json`
  - excludes `types/**` and overrides `types: []` for declaration emit, so
    build does not consume the published ambient helper declaration.

Generation:

- `packages/web/scripts/generate-component-registry.mjs`
  - generates component value exports and companion `export type *` entries
  - emits Vue `GlobalComponents` declarations into the generated registry
  - generates `src/version.ts`
  - keeps `types/components.d.ts` as a published ambient helper referencing
    the public package root
- `packages/web/scripts/generate-agent-skill.mjs`
  - points first steps and usage rules to type-support guidance
- `packages/web/skill.seed.json`
  - includes `docs/30-unit-tdd/web/type-support.md`

Documentation:

- `docs/30-unit-tdd/web/type-support.md`
  - durable TypeScript and global component support contract
- `docs/20-product-tdd/release-surface.md`
  - web package no longer lists `src/components` as published surface
- `packages/web/README.md`
  - documents root component and type imports
- `packages/web/skills/design-web/references/type-support.md`
  - generated Agent Skill reference

Verification:

- `packages/web/scripts/check-packed-consumer-types.mjs`
  - packs the current package
  - asserts the packed package omits `src/components`, `src/types`, and
    `src/composables`
  - asserts `./components/*` is absent from packed exports
  - checks declarations do not reference raw component source paths
  - runs `vue-tsc` with `skipLibCheck: false` against a temporary consumer
    using root imports, component helper types, Vue global components, and a
    negative raw component subpath case.

## Verification Results

Passed:

```text
pnpm --filter @partner-up-dev/design-web run type-check
pnpm --filter @partner-up-dev/design-web run build
pnpm --filter @partner-up-dev/design-web run check:packed-types
pnpm --filter @partner-up-dev/design-web run verify
```

Full `verify` covered:

```text
generate:check
skill:generate:check
vue-tsc --noEmit
intent validate
vite build
vue-tsc declaration emit
packed consumer type check
story coverage
histoire build
```

## Release Note

The release branch reconciled the GitHub Packages baseline by treating the
already-published `0.3.0` as the starting version and consuming the pending web
changesets into `@partner-up-dev/design-web@0.4.0`.

`packages/web/CHANGELOG.md` now records the type-surface fix in the `0.4.0`
minor release notes.
