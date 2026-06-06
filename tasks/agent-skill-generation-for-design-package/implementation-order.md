# Implementation Order

## Phase 1: Task packet and decisions

Status:

```
in progress
```

Deliverables:

```
problem frame
package scope
seed map contract
skill IA
distribution decision
verification matrix
```

Gate:

```
The packet makes clear that the generated skill is for consumers, per package,
seed-map driven, and distributed primarily through npm package artifacts.
```

## Phase 2: Seed map

Deliverables:

```
packages/web/skill.seed.json
initial story group taxonomy
seed entries for all public components
explicit ignored-component mechanism
```

Gate:

```
Every public registry component is represented or explicitly ignored.
```

## Phase 3: Read-only model generator

Deliverables:

```
script that reads package facts
intermediate model JSON
validation of seed coverage
warnings for story mismatches and missing docs
```

Gate:

```
The model can be generated without writing skill artifacts.
```

## Phase 4: Markdown renderer

Deliverables:

```
SKILL.md
references/component-map.md
references/composition-recipes.md
references/usage-rules.md
references/components/*.md
```

Gate:

```
Generated docs pass static artifact checks.
```

## Phase 5: Package distribution

Deliverables:

```
package.json files include skill artifacts
TanStack Intent metadata added if adopted
consumer install instructions documented
postinstall remains non-mutating by default
```

Gate:

```
Installed package exposes the skill from node_modules and intent load can read it.
```

## Phase 6: Agent dry runs

Deliverables:

```
dry-run prompts
agent behavior notes
gap list for seed map and templates
```

Gate:

```
Agent uses package components correctly in at least three representative
consumer tasks.
```

