# AGENTS.md of PartnerUp Design UniApp

This package owns the UniApp-compatible implementation of the PartnerUp design
system. Root workflow and release policy are owned by `../../AGENTS.md` and
`../../CONTRIBUTING.md`.

## Package Layout

```text
packages/uniapp/
|-- src/
|   |-- components/       # Pu* UniApp components
|   |-- demo/             # Local demo application
|   |-- styles/           # Token, component, mixin, and style entry sources
|   |-- utils/
|   `-- index.ts          # Package entry
|-- types/                # Component type declarations
|-- CONTRIBUTING.md       # Legacy package-local contribution notes
|-- README.md
`-- vite.config.ts
```

## Development Workflow

- Use `pnpm --filter @partner-up-dev/design-uniapp run type-check` for type verification.
- Use `pnpm --filter @partner-up-dev/design-uniapp run build` for package output verification.
- Use `pnpm --filter @partner-up-dev/design-uniapp run dev` for local demo work.
- Published package contents are source-oriented. Do not assume the package is bundled like the web package.

## Local Rules

- Keep UniApp platform compatibility ahead of web-only convenience.
- Avoid browser-only DOM assumptions in shared component logic.
- Styles should use the package token layers and SCSS utilities instead of hardcoded visual values.
- Keep public `Pu*` naming and broad API shape aligned with the web package where platform constraints allow it.
- Treat `src/components`, `src/styles`, and `types` as the published surface.

## Documentation Index

- `README.md`: consumer install, style usage, token architecture, and theme notes.
- `CONTRIBUTING.md`: existing package-local setup and token contribution notes.
- `CHANGELOG.md`: release history for `@partner-up-dev/design-uniapp`.
- `../../README.md`: workspace package and publishing overview.
- `../../CONTRIBUTING.md`: root commit, changeset, release, and verification policy.
