# UniApp Unit TDD

This directory owns durable technical contracts for
`@partner-up-dev/ui-uniapp`.

## Package Role

The UniApp package provides a UniApp-compatible PartnerUp design-system source
package built with Vite, Vue 3, TypeScript, and SCSS.

## Public Surface

Treat these as the package's primary public surface:

```text
src/components
src/styles
types
```

## Technical Constraints

- Preserve UniApp platform compatibility ahead of web-only convenience.
- Avoid browser-only DOM assumptions in shared component logic.
- Keep public `Pu*` naming and broad API shape aligned with the web package
  where platform constraints allow it.
- Styles should use reference, system, and component token layers before local
  hardcoded values.
- Prefer package token layers and SCSS utilities for component styling.

## Verification

Use at least:

```powershell
pnpm --filter @partner-up-dev/ui-uniapp run type-check
pnpm --filter @partner-up-dev/ui-uniapp run build
```
