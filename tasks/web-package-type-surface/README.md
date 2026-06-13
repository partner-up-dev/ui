# Web Package Type Surface Task Packet

Status:

```text
Executed. Source changes implemented and verified.
```

## Purpose

Fix `@partner-up-dev/design-web` package type support and public release
surface after evidence from the GitHub npm registry package showed broken
consumer typing in `0.3.0`.

This packet owns the release-surface repair plan, not component behavior.

## Target State

```text
@partner-up-dev/design-web publishes stable public entry points whose runtime
files and declaration files resolve from the packed package without relying on
unpublished source internals.
```

Required outcomes:

- Root imports expose public components and their supported TypeScript types.
- Vue `GlobalComponents` declarations reference stable public exports or
  built declarations, not raw `src/**/*.vue` paths.
- Component subpath imports are either removed from the public contract or
  backed by explicit built runtime and type entries.
- Packed package contents are closed over all public runtime and declaration
  dependencies.
- Runtime `version`, declaration `version`, and package version stay aligned.
- The generated `design-web` Agent Skill documents type-support and public
  import rules for consumers.

## Scope

In scope:

- `packages/web/package.json`
- `packages/web/src/index.ts`
- `packages/web/scripts/generate-component-registry.mjs`
- `packages/web/scripts/generate-agent-skill.mjs`
- `packages/web/skill.seed.json`
- generated registry, global component declarations, and skill artifacts
- package verification scripts for packed-package consumer checks
- release metadata needed for a package-visible fix

Out of scope:

- component DOM, style, or prop behavior unrelated to type exports
- UniApp package changes unless a cross-package contract forces alignment
- republishing old broken package versions in place

## Files

```text
README.md
+-- packet entry, target state, scope, and file index

evidence.md
+-- registry, local package, and ecosystem evidence behind the diagnosis

implementation-plan.md
+-- concrete implementation plan and owned source files

verification-matrix.md
+-- required local, packed-package, and release verification gates

implementation-record.md
+-- implemented decisions, touched files, and verification results
```

## Implemented Decision

The implemented path makes the package root the canonical component and type
API, removes `./components/*` from the web package export map, and stops
publishing `src/components` as consumer package contents.

Global component declarations are now emitted from the generated registry into
`dist/component-registry.d.ts`, while `types/components.d.ts` remains a
published ambient type helper that references public package root exports.
