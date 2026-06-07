# AGENTS.md of PartnerUp Design

PartnerUp Design is a pnpm workspace for shared PartnerUp design-system packages.
This file is the root operating map for agents. Package-local rules are additive.

## Repository Layout

```text
/
|-- .changeset/           # Changesets release metadata
|-- .github/workflows/    # CI and publish automation
|-- packages/
|   |-- web/              # Vue web design-system package
|   `-- uniapp/           # UniApp design-system package
|-- tasks/                # Agent-owned task workspaces and implementation records
|-- package.json          # Root scripts and release entry
`-- pnpm-workspace.yaml
```

## Package Boundaries

- `packages/web/`: standard Vue web DOM package. Read `packages/web/AGENTS.md` before editing this subtree.
- `packages/uniapp/`: UniApp-compatible source package. Read `packages/uniapp/AGENTS.md` before editing this subtree.
- Shared release and workspace behavior is owned by the repository root.
- Avoid moving behavior between packages unless the change explicitly targets cross-package API alignment.

## Development Workflow

- Install from the root with `pnpm install`.
- Run workspace builds from the root with `pnpm run build`.
- Use package filters for package-local work, for example `pnpm --filter @partner-up-dev/design-web run verify`.
- Keep changesets focused on release-worthy package changes. Do not create a changeset to republish an already-versioned package.
- Keep `tasks/` as task-local workspace state for investigation notes, migration plans, verification matrices, and implementation records.
- Generated output such as `dist/`, `.histoire/dist/`, and `node_modules/` is not durable source.

## Documentation Index

- `README.md`: package list, registry setup, and release workflow summary.
- `CONTRIBUTING.md`: commit policy, changeset policy, release policy, and verification expectations.
- `packages/web/README.md`: consumer usage for `@partner-up-dev/design-web`.
- `packages/web/docs/`: durable web package contracts and composition guidance.
- `packages/web/skills/design-web/`: generated agent skill and component references for web package usage.
- `packages/uniapp/README.md`: consumer usage for `@partner-up-dev/design-uniapp`.
- `packages/uniapp/CONTRIBUTING.md`: legacy UniApp package contribution notes.
- `tasks/*/README.md`: task packet entry points for non-trivial agent work.

## Agent Operating Notes

- Prefer reading the nearest `AGENTS.md` before changing a package subtree.
- Keep root docs about workflow and ownership; keep package docs about local technical constraints.
- Keep volatile reasoning in `tasks/` until it is stable enough to promote into root or package documentation.
- Verify user claims against repository state before changing release metadata.
