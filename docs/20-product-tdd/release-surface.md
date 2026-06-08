# Release Surface

This file owns durable technical policy about what package releases expose.

## Root Package

The root `@partner-up-dev/design` package is private and owns workspace scripts.

## Web Package

Release identity:

```text
@partner-up-dev/design-web
```

Published surface:

```text
dist
skills
src/components
src/styles
src/utils
types
```

Public exports include the package root, styles, component source paths, utils,
UnoCSS preset, and component types as declared in `packages/web/package.json`.

## UniApp Package

Release identity:

```text
@partner-up-dev/design-uniapp
```

Published package contents are source-oriented. Treat `src/components`,
`src/styles`, and `types` as the primary public surfaces.

## Changesets

Add a changeset only when a package public API, package contents, runtime
behavior, or consumer-facing documentation changes.

Do not add a changeset for SVC documentation topology changes unless they alter
published package contents or consumer-facing package docs.
