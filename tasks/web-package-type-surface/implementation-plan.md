# Implementation Plan

## Outcome

Implemented on 2026-06-12. The chosen policy is Option A: root-only component
API. `./components/*` is removed from the web package export map and
`src/components` is no longer published as package contents.

## Goal

Make `@partner-up-dev/design-web` publish a closed, stable, typed public API for
root imports, global component declarations, and supported component subpaths.

## Preflight

Before editing source:

1. Verify the branch and working tree.
2. Fetch or inspect the canonical remote state because GitHub Packages has
   `@partner-up-dev/design-web@0.3.0` while the local tag list currently stops
   at `@partner-up-dev/design-web@0.2.0`.
3. Confirm whether the next fix release should be `0.3.1` or the repository's
   next changeset-driven version.
4. Run current package build/type-check once if dependency state is healthy, to
   separate existing failures from this change.

## Plan Files And Source Ownership

Implementation should touch these source areas:

```text
packages/web/src/index.ts
packages/web/package.json
packages/web/scripts/generate-component-registry.mjs
packages/web/scripts/generate-agent-skill.mjs
packages/web/skill.seed.json
docs/30-unit-tdd/web/type-support.md
docs/20-product-tdd/release-surface.md
tasks/web-package-type-surface/*
```

Generated outputs expected after source changes:

```text
packages/web/src/component-registry.ts
packages/web/types/components.d.ts
packages/web/skills/design-web/SKILL.md
packages/web/skills/design-web/references/*
```

Optional helper scripts if the packed-package check becomes durable:

```text
packages/web/scripts/check-packed-consumer-types.mjs
```

## Step 1: Version Source

Replace hard-coded runtime package version.

Preferred implementation:

- Import version from `../package.json` in `src/index.ts`, or generate a small
  package version module before build.
- Preserve the public `version` export.
- Ensure emitted `dist/index.js` and `dist/index.d.ts` contain the package
  version for the built package.

Acceptance:

```text
packed package version === package.json version
runtime version export === package.json version
declaration version literal === package.json version, or declaration type is
stable enough to avoid stale literal drift
```

## Step 2: Root Type Surface

Make the package root the canonical public component and component-type API.

Required behavior:

- `import { PuButton } from '@partner-up-dev/design-web'` works.
- `import type { PuButtonFeedback } from '@partner-up-dev/design-web'` works
  for exported component types.
- Shared types continue to export from the root.
- Type exports do not require consumers to import implementation files.

Implementation options:

1. Extend generated `src/component-registry.ts` to also re-export
   `export type * from './components/<folder>/<stem>'` for every component
   companion `.ts` file.
2. Generate a separate public type barrel and export it from `src/index.ts`.

Preferred:

```text
Generate component value exports and companion type exports together so drift is
checked by the existing registry generation workflow.
```

## Step 3: Global Component Declarations

Change generated `types/components.d.ts`.

Current bad shape:

```ts
PuButton: typeof import('../src/components/puButton/puButton.vue')['default']
```

Preferred target:

```ts
PuButton: typeof import('@partner-up-dev/design-web')['PuButton']
```

Reason:

```text
Global component types should follow the public package API and should not
force TypeScript to resolve raw published source SFC paths.
```

Acceptance:

- `import '@partner-up-dev/design-web'` passes in a packed-package temporary
  consumer with `skipLibCheck: false`.
- Vue `GlobalComponents['PuButton']` resolves after package import or explicit
  type inclusion.

## Step 4: Component Subpath Policy

Choose and implement one public policy.

### Option A: Root-only component API

Remove or narrow `./components/*` from `exports`, and document that consumers
must import components from the package root.

Pros:

- Smallest public API.
- Aligns with current generated skill examples.
- Avoids promising deep component paths.

Cons:

- Breaking for any consumer already importing component subpaths.
- Less friendly to auto-import resolvers that expect per-component entries.

### Option B: Stable generated component subpaths

Generate public per-component entry files and map them through `exports`.

Example public path:

```text
@partner-up-dev/design-web/components/PuButton
```

Possible generated source shape:

```text
src/components-public/PuButton.ts
+-- export { default } from '../components/puButton/puButton.vue'
+-- export { default as PuButton } from '../components/puButton/puButton.vue'
+-- export * from '../components/puButton/puButton'
+-- export type * from '../components/puButton/puButton'
```

Published build shape:

```text
dist/components/PuButton.js
dist/components/PuButton.d.ts
```

`package.json` export shape:

```json
"./components/*": {
  "types": "./dist/components/*.d.ts",
  "import": "./dist/components/*.js",
  "default": "./dist/components/*.js"
}
```

Preferred decision:

```text
Option B if there is confirmed consumer usage or auto-import demand. Otherwise
Option A is technically cleaner for the next patch.
```

Do not keep the current source export:

```json
"./components/*": "./src/components/*"
```

## Step 5: Publish Contents

Make package `files` match the chosen public surface.

Required:

- All public entry runtime files are included.
- All public declaration files and declaration dependencies are included.
- No public entry resolves into a partially published source tree.

Likely target:

```json
"files": [
  "dist",
  "skills",
  "src/styles",
  "types"
]
```

Keep `src/styles` only for the documented Sass source entry. Avoid shipping
`src/components` as a consumer API unless the package intentionally publishes
the entire source dependency closure.

## Step 6: Agent Skill Type Support Coverage

The generated `design-web` Agent Skill must cover type-support and public import
rules.

Durable source:

```text
docs/30-unit-tdd/web/type-support.md
```

Required content:

- Root imports are canonical for components and component-owned types.
- Do not import from `src/components/*` or generated registry internals.
- If component subpaths are supported, list their exact stable shape.
- Explain global component type support and how consumers should include it.
- Explain style import versus Sass source import.

Skill generation changes:

- Add `docs/30-unit-tdd/web/type-support.md` to
  `packages/web/skill.seed.json` `skillReferences`.
- Update `generate-agent-skill.mjs` root skill text or `usage-rules` renderer
  so type-support guidance is discoverable from the first steps and usage rules.
- Regenerate `packages/web/skills/design-web/*`.

Acceptance:

- `packages/web/skills/design-web/SKILL.md` references the type-support file.
- `packages/web/skills/design-web/references/type-support.md` exists.
- `packages/web/skills/design-web/references/usage-rules.md` tells downstream
  agents not to use source component paths and how to import public types.

## Step 7: Verification Script

Add a packed-package consumer check.

Minimum cases:

```ts
import '@partner-up-dev/design-web'
import { PuButton, type PuButtonFeedback } from '@partner-up-dev/design-web'
import type { GlobalComponents } from 'vue'

type ButtonProps = InstanceType<typeof PuButton>['$props']
type ButtonGlobal = GlobalComponents['PuButton']
```

If component subpaths are supported:

```ts
import PuButton, {
  type PuButtonFeedback
} from '@partner-up-dev/design-web/components/PuButton'
```

The check must run against `npm pack` output, not the workspace package path.

## Step 8: Release Metadata

This fix changes public package exports, package contents, and consumer-facing
type behavior. Add a focused changeset unless the chosen release process has a
different versioning mechanism for the package.

Suggested release note:

```text
Fix design-web package type support by aligning global component declarations,
component type exports, and public component entry points with built package
artifacts.
```

## Risks

- Removing `./components/*` can break consumers already relying on source paths.
- Keeping subpaths requires generated public entries and careful package export
patterns.
- TypeScript resolution differs across `moduleResolution` modes; verification
  should cover at least `bundler` and `node16` if feasible.
- The local repository version/tag state may lag GitHub Packages; verify before
  choosing the next release version.
