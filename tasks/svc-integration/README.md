# SVC Integration Task Packet

Purpose:

```text
Integrate the local F:/CODING/svc Sustainable Vibe Coding framework as the
repository documentation operating model for PartnerUp Design, replacing the
current implicit documentation system while preserving package ownership,
release workflow, and design-system rules.
```

Status:

```text
Created on 2026-06-07 from read-only repository inspection.
Started after explicit user confirmation.
SVC docs topology, AGENTS routing, and web skill source routing have been
updated. No package runtime behavior changes have been made.
```

MVT core:

```text
Objective & Hypothesis:
  Add SVC's typed front-door workflow and durable documentation layers to
  design2 while preserving existing root and package-local AGENTS boundaries.

Guardrails Touched:
  - Root workflow and package ownership remain governed by existing design2
    AGENTS/CONTRIBUTING rules.
  - SVC templates must be adapted, not copied blindly over repository-specific
    rules.

Verification:
  - Diff shows no package runtime/API changes unless separately approved.
  - Root AGENTS keeps PartnerUp package boundaries and adds SVC routing clearly.
  - Existing durable docs are either mapped into SVC layers or deliberately kept
    as consumer/generated documentation.
```

Current state:

```text
design2:
  - pnpm workspace with packages/web and packages/uniapp.
  - Existing root/package AGENTS files already define repository ownership.
  - No root docs/ directory exists.
  - tasks/ already exists and uses task-packet-style README records.
  - packages/web/docs previously owned durable component contracts and
    composition principles, which now live under docs/30-unit-tdd/web/.
  - CONTRIBUTING.md and .github/workflows/publish.yml currently carry release
    and publish operational truth, which should be mapped to deployment/release
    runbook guidance.

svc:
  - Python/PDM documentation framework, not an application service.
  - Framework baseline: v9.8.
  - Provides docs/templates for typed input routing, mode SOPs, task packets,
    PRD/TDD/deployment layers, and implementation taste.
  - Provides install_agents tool, but codex-agents are explicitly out of scope
    for this integration.
```

User-confirmed constraints:

```text
1. Do not integrate SVC codex-agents.
2. Do not create a PRD layer unless a concrete future need appears.
3. SVC should replace the existing implicit documentation system, not sit beside
   it as an unused extra layer.
4. AGENTS.md should be strengthened as the repository front door.
```

Likely integration shape:

```text
1. Preserve and extend root AGENTS.md instead of replacing it.
2. Add docs/00-meta for SVC routing, modes, ontology cheat sheet, destination
   map, and implementation taste.
3. Add docs/20-product-tdd for workspace-level technical topology, package
   boundaries, cross-package alignment policy, release surface, and generated
   skill/documentation ownership.
4. Add docs/30-unit-tdd for package-level durable technical contracts. Migrate
   packages/web/docs component-contract and composition-principles into the web
   unit's durable technical docs, leaving generated skill docs as derived
   consumer/agent references.
5. Add docs/40-deployment for release and publish runbook truth currently split
   across CONTRIBUTING.md and .github/workflows/publish.yml.
6. Keep README files consumer-facing and short, pointing to durable SVC layers
   for contributor/agent technical truth.
7. Avoid changesets because this is repository workflow/documentation, not a
   package release contract change.
```

Open decisions before execution:

```text
Resolved:
1. Use docs/30-unit-tdd/web/ and docs/30-unit-tdd/uniapp/.
2. Remove packages/web/docs entirely after migration; no compatibility
   redirects remain.
3. Package-local AGENTS now link to docs/30-unit-tdd as durable structure.
4. Web skill generation now reads root Unit TDD directly through
   packages/web/skill.seed.json and a repo-root-safe script path check.
5. Codex agent TOML files remain out of scope.
6. PRD remains out of scope until concrete product-intent pressure appears.
```

Execution record:

```text
Created:
  docs/00-meta/
  docs/20-product-tdd/
  docs/30-unit-tdd/
  docs/40-deployment/

Updated:
  AGENTS.md
  CONTRIBUTING.md
  README.md
  packages/web/AGENTS.md
  packages/uniapp/AGENTS.md
  packages/web/skill.seed.json
  packages/web/scripts/generate-agent-skill.mjs
  packages/web/docs/component-contract.md (deleted after full migration)
  packages/web/docs/composition-principles.md (deleted after full migration)

Verification:
  pnpm --filter @partner-up-dev/design-web run skill:generate:check
    passed
    existing warning remains: PuScrollView has no matching story coverage
```
