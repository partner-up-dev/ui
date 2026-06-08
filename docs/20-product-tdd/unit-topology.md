# Unit Topology

PartnerUp Design is a pnpm workspace for shared PartnerUp design-system
packages.

## Units

| Unit | Physical Surface | Role |
| --- | --- | --- |
| Workspace | root files, `.github/workflows/`, `.changeset/` | release, package orchestration, shared agent rules |
| Web package | `packages/web/` | Vue web DOM design-system package |
| UniApp package | `packages/uniapp/` | UniApp-compatible design-system package |
| Task layer | `tasks/` | agent-owned volatile workspaces and evidence |

## Boundaries

- The web package owns standard Vue DOM implementation, Histoire stories,
  generated web skill references, and bundled package output.
- The UniApp package owns UniApp-compatible source and demo behavior.
- Root workflow owns release policy, changesets, workspace scripts, and shared
  agent routing.
- Avoid moving behavior between packages unless the change explicitly targets
  cross-package API alignment.
