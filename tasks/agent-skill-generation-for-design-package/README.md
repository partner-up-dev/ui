# Agent Skill Generation For Design Package Task Packet

Purpose:

```
Design a per-package workflow that generates agent skills from a design package
so downstream AI agents can use the package correctly in application code.
```

Scope:

```
Initial package:
  packages/web
  @partner-up-dev/design-web

Out of scope for the first pass:
  packages/uniapp
  maintaining or adding design package components
  automatically modifying downstream user agent configuration during npm install
```

Decision frame:

```
The generated skill is for package consumers, not maintainers.

The skill should help an agent:
  choose the right component
  compose components into common UI structures
  use stable props, slots, and events
  avoid package-specific misuse
  load detailed component references only when needed

The skill should not become a copied component catalog or full docs dump.
```

Current direction:

```
1. Generate one skill per npm package.
2. Ship the skill as a package artifact under the package itself.
3. Use a manually maintained seed map as the product taxonomy source.
4. Make Histoire story groups conform to the seed map.
5. Prefer TanStack Intent for npm-package skill discovery and version binding.
6. Keep Vercel skills CLI as a secondary ecosystem reference.
7. Avoid default postinstall mutation of user agent config.
```

Files:

```
README.md
  Packet entry, scope, direction, and file index.

problem-frame.md
  Why this is needed and what user-agent failures it should reduce.

package-scope.md
  Per-package boundaries and the first @partner-up-dev/design-web scope.

current-design-package-inventory.md
  Local facts about packages/web sources, stories, docs, and verification.

seed-map-contract.md
  Manual component taxonomy and story-group source-of-truth contract.

skill-ia-draft.md
  IA for the generated package-consumer skill.

skill-contract.md
  Required generated skill structure, tone, references, and guardrails.

generation-workflow.md
  Generator pipeline, intermediate model, and sequence diagram.

artifact-distribution.md
  TanStack Intent, Vercel skills, and postinstall distribution decisions.

template-set.md
  Draft templates for SKILL.md and component reference output.

verification-matrix.md
  Static, package, and agent-behavior checks for generated skills.

implementation-order.md
  Suggested implementation phases and gates.

references.md
  Local and external evidence.

implementation-record.md
  Reserved for implementation results and verification logs.
```

