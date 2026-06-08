# Input Routing

Classify the request before changing source or durable docs.

## Types

- Intent: product or package behavior promise changes. If this pressure appears
  repeatedly, add a PRD layer before encoding product claims elsewhere.
- Constraint: technical boundary, compatibility, package topology, release
  surface, environment, or verification rule changes while package behavior
  stays stable.
- Reality: observed behavior disagrees with expected behavior. Gather evidence
  before fixing or updating durable truth.
- Artifact: bounded deliverable such as a task packet, migration notes,
  generated reference, or one-off analysis.

## Default Owners

- Workspace/package topology: `docs/20-product-tdd/`
- Cross-package API alignment: `docs/20-product-tdd/`
- Package-internal durable technical contracts: `docs/30-unit-tdd/<unit>/`
- Release, publish, and rollback procedure: `docs/40-deployment/`
- Local tactical hazards: nearest `AGENTS.md`
- Volatile investigation and task state: `tasks/`
- Consumer install and usage: `README.md` files

## Rules

1. Identify the owner before editing.
2. For non-trivial work, open or update a task packet.
3. Search source and durable docs with `tasks/`, generated output,
   dependencies, and caches excluded unless the task targets them.
4. Promote task knowledge only when it is stable and costly to rediscover.
5. Do not use PRD storage until this design-system repository has concrete
   product-intent pressure that README and TDD cannot represent cleanly.
