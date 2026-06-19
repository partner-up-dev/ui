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
icon safelist so downstream apps that use `partnerUpDesignPreset()` generate
CSS for built-in component `i-mdi-*` icons even when the icon class only appears
inside the published design package. Consumers that do not use the preset may
merge the exported safelist manually.

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
