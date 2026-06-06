# Template Set

These are draft templates for generated output. They are not implementation
templates yet.

## SKILL.md template

```md
---
name: partnerup-design-web
description: Use @partner-up-dev/design-web Vue components correctly in application UI, including component selection, composition, props, slots, events, and package-specific caveats.
---

# PartnerUp Design Web

## Use When

Use this skill when building Vue UI with @partner-up-dev/design-web or when a
task asks which PartnerUp design component to use.

## First Steps

1. Identify the UI intent.
2. Read references/component-map.md for candidate components.
3. For page-level UI, read references/composition-recipes.md.
4. For structure, styling, or responsive decisions, read references/composition-principles.md.
5. Read only the selected component reference files.
6. Implement with public package APIs.

## Component Selection

[generated compact intent map]

## Import And Registration

[generated package import guidance]

## Rules

[generated cross-component rules]

## References

- references/component-map.md
- references/composition-recipes.md
- references/composition-principles.md
- references/usage-rules.md

## Avoid

[generated anti-patterns]
```

## component-map.md template

```md
# Component Map

## Actions

- PuButton
  - Intent: command button, loading command, icon button
  - Read: references/components/PuButton.md

## Forms

- PuFileUpload
  - Intent: file collection, drag/drop upload, URL file entry
  - Read: references/components/PuFileUpload.md
```

## Component reference template

````md
# PuExample

## Intent

[seed intent]

## Prefer When

[seed preferWhen]

## Avoid When

[seed avoidWhen]

## Import

```ts
import { PuExample } from '@partner-up-dev/design-web'
```

## Props

[extracted primary prop table]

## Slots

[extracted slot table]

## Events

[extracted event table]

## Story Variants

[story variant titles]

## Examples

[short canonical examples from story]

## Caveats

[seed and extracted caveats]
````

## usage-rules.md template

```md
# Usage Rules

## Public API

Use exported package components and documented props, slots, and events.

## Package Caveats

[generated caveats]

## Anti-patterns

[generated anti-patterns]
```
