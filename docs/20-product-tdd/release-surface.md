# Release Surface

This file owns durable technical policy about what package releases expose.

## Root Package

The root `@partner-up-dev/ui` package is private and owns workspace scripts.

## Web Package

Release identity:

```text
@partner-up-dev/ui-web
```

Published surface:

```text
CHANGELOG.md
MIGRATION.md
dist
skills
src/styles
src/utils
types
```

Public exports include the package root, styles, utility source paths, UnoCSS
preset, and component global types as declared in `packages/web/package.json`.
Public component values and component-specific TypeScript helper types are
imported from the package root. The web package does not expose
`src/components/*` or `./components/*` as downstream consumer API.

The `./uno` export exposes the default PartnerUp UnoCSS preset plus named
package-owned safelist constants. The default preset includes the package-owned
icon safelist so downstream apps that use `partnerUpUiPreset()` generate
CSS for built-in component `i-mdi-*` icons even when the icon class only appears
inside the published UI package. Consumers that do not use the preset may
merge the exported safelist manually.

## UniApp Package

Release identity:

```text
@partner-up-dev/ui-uniapp
```

Published package contents are source-oriented. Treat `src/components`,
`src/styles`, `types`, `CHANGELOG.md`, and `MIGRATION.md` as the primary public
surfaces.

## Changesets

Add a changeset only when a package public API, package contents, runtime
behavior, or consumer-facing documentation changes.

Do not add a changeset for SVC documentation topology changes unless they alter
published package contents or consumer-facing package docs.

## Migration Guides

Package-local `MIGRATION.md` files are published consumer documentation. Update
the affected package guide when a release introduces breaking API, export,
runtime, or package-content changes. Use the package changelog for release
history and the migration guide for concrete consumer action.
