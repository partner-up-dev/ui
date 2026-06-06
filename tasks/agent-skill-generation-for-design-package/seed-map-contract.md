# Seed Map Contract

## Purpose

The seed map is the manually maintained product taxonomy for the package.

It is the source of truth for:

```
component category
component intent
story group
composition relationships
consumer-facing warnings
preferred examples
```

It is not the source of truth for broad design or implementation principles.
Those belong in durable package docs and may be listed in the seed as generated
skill references.

Story folders should conform to this map. The generator should not infer final
taxonomy from story paths alone.

## Candidate location

```text
packages/web/skill.seed.json
```

Alternative:

```text
packages/web/docs/skill-seed.json
```

The first option keeps the seed close to the package root and makes it easy for
the generator and package artifact checks to find.

## Top-level shape

```json
{
  "package": "@partner-up-dev/design-web",
  "skill": {
    "name": "partnerup-design-web",
    "description": "Use @partner-up-dev/design-web Vue components correctly in application UI."
  },
  "storyGroups": {},
  "skillReferences": [
    {
      "source": "docs/composition-principles.md",
      "target": "references/composition-principles.md",
      "description": "durable package principles for component ownership, composition, tokens, and local CSS."
    }
  ],
  "components": {}
}
```

## Story groups

Story groups should be stable product categories, not temporary filesystem
clusters.

Candidate groups:

```json
{
  "actions": {
    "label": "Actions",
    "intent": "Commands and user-triggered actions"
  },
  "forms": {
    "label": "Forms",
    "intent": "Inputs, selection, upload, and form structure"
  },
  "display": {
    "label": "Display",
    "intent": "Content presentation, status, and page structure"
  },
  "overlay": {
    "label": "Overlay",
    "intent": "Dialogs, drawers, and layered interactions"
  },
  "layout": {
    "label": "Layout",
    "intent": "Page scaffolds and structural containers"
  }
}
```

The current `display` group may include both content components and page
structure. The seed map can split semantic categories while preserving Histoire
folder compatibility until stories are reorganized.

## Component entry

```json
{
  "PuButton": {
    "category": "actions",
    "intent": [
      "command button",
      "loading command",
      "icon button"
    ],
    "preferWhen": [
      "The UI needs a user-triggered command or compact icon command."
    ],
    "avoidWhen": [
      "The UI is navigation that should be a link unless the component supports anchor semantics."
    ],
    "composeWith": [
      "PuPageHeader",
      "PuFormItem",
      "PuModal"
    ],
    "apiCaveats": [
      "Uses legacy theme values rather than canonical tone."
    ],
    "storyGroup": "actions",
    "storyFile": "src/stories/actions/PuButton.story.vue"
  }
}
```

## Required fields

```
category
intent
preferWhen
storyGroup
```

## Optional fields

```
avoidWhen
composeWith
apiCaveats
accessibilityNotes
commonMistakes
primaryProps
primarySlots
primaryEvents
storyFile
referencePriority
```

## Skill references

`skillReferences` is a manifest for durable docs that should be copied into the
generated skill artifact.

Each entry must include:

```
source
target
description
```

Rules:

```
source is package-relative and points to a durable doc
target is package-skill-relative and stays under references/
source docs must include <!-- agent-skill:start --> and <!-- agent-skill:end -->
the seed stores the manifest only, not the principle prose
```

## Generator behavior

The generator should:

```
fail when a public component has no seed entry unless explicitly ignored
fail when a seed storyGroup is unknown
warn when story path group does not match seed storyGroup
warn when seed references a missing story file
warn when extracted public API conflicts with seed primary fields
render seed intent before extracted API tables
extract skillReferences from durable docs into generated references
```

## Ignored components

If a public component should not appear in the generated consumer skill, the seed
must state why:

```json
{
  "PuInternalExample": {
    "ignore": true,
    "reason": "Test fixture only."
  }
}
```

Silent omission should not be allowed.
