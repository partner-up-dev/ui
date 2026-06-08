# Durable Destination Map

Use the closest durable owner for the truth.

| Truth | Owner |
| --- | --- |
| Package list and consumer install | Root `README.md` |
| Published package usage | Package `README.md` |
| Commit and changeset policy | Root `CONTRIBUTING.md` |
| Workspace topology and package ownership | `docs/20-product-tdd/` |
| Cross-package API alignment | `docs/20-product-tdd/cross-package-contracts.md` |
| Web component contracts | `docs/30-unit-tdd/web/component-contract.md` |
| Web composition principles | `docs/30-unit-tdd/web/composition-principles.md` |
| UniApp package technical constraints | `docs/30-unit-tdd/uniapp/README.md` |
| Publish workflow and release runbook | `docs/40-deployment/release-runbook.md` |
| Local hazards and package-specific edit rules | nearest `AGENTS.md` |
| Task-local state, exploration, evidence | `tasks/` |
| Generated agent skill references | `packages/web/skills/design-web/` |

## Placement Checks

- If a truth must survive folder refactors, do not leave it only in a local
  package README.
- If a truth protects one fragile local surface, keep it in the nearest
  `AGENTS.md`.
- If a truth is generated, document its source and regeneration command instead
  of editing the generated file as authority.
- If a truth is consumer-facing package usage, keep README concise and link to
  technical docs only when contributors need more detail.
