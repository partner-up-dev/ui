# Skill Contract

## Required frontmatter

```yaml
---
name: partnerup-design-web
description: Use @partner-up-dev/design-web Vue components correctly in application UI, including component selection, composition, props, slots, events, and package-specific caveats.
---
```

The description must mention:

```
package name
Vue application UI
component selection
composition
props, slots, events
package-specific caveats
```

This metadata is the always-loaded trigger surface, so it must be explicit.

## Required sections

`SKILL.md` should contain:

```text
# PartnerUp Design Web

## Use When
## First Steps
## Component Selection
## Import And Registration
## Rules
## References
## Avoid
```

## Tone

Use direct procedural language.

Prefer:

```
Use PuEmptyState for empty search results.
Load references/components/PuFileUpload.md before implementing file collection.
Do not invent tone props for PuButton; it uses theme.
```

Avoid:

```
PuEmptyState is a beautiful and flexible component.
This package offers many possibilities.
```

## Required reference links

`SKILL.md` must link to:

```
references/component-map.md
references/composition-recipes.md
references/composition-principles.md
references/usage-rules.md
```

`references/composition-principles.md` must be generated from a durable package
doc, not authored directly inside the skill artifact.

Component detail files should be linked from `component-map.md`, not all listed
in `SKILL.md`.

## Guardrails

The generated skill must state:

```
Use public package components before custom markup when the intent matches.
Use actual package APIs from component references.
Do not assume generic design-system prop names.
Prefer package-owned responsive composition before app-level wrapper CSS.
Do not use package internals as consumer API.
Do not edit the design package unless the user explicitly asks to maintain it.
```

## Durable docs as source

Generated skill references that describe broad design or implementation
principles must come from durable package docs:

```json
"skillReferences": [
  {
    "source": "docs/composition-principles.md",
    "target": "references/composition-principles.md",
    "description": "durable package principles for component ownership, composition, tokens, and local CSS."
  }
]
```

The source doc must include:

```md
<!-- agent-skill:start -->
...
<!-- agent-skill:end -->
```

The generator extracts only the marked excerpt. The seed is a manifest, not the
source of principle prose. The skill artifact is generated output, not durable
documentation.

## Component reference contract

Each generated component reference should include:

```text
# PuExample

## Intent
## Prefer When
## Avoid When
## Import
## Props
## Slots
## Events
## Story Variants
## Examples
## Caveats
```

Sections may be omitted only when there is no extracted or seed data.

## API source priority

When data conflicts:

```
1. Actual component source and exported types
2. Seed-map caveats and intent
3. Histoire story usage
4. Package docs
5. Older task packet notes
```

The generated skill should preserve actual public API even when it differs from
newer package conventions.

## Size budget

Target:

```
SKILL.md: under 250 lines
component-map.md: under 500 lines
component references: concise, one file per public component
```

Long details should stay in component references, not the root skill.
