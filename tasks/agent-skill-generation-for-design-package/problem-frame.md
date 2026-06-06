# Problem Frame

## Problem

The design package contains the information an AI agent needs, but it is spread
across component source, story files, package docs, task packets, generated
registries, and local conventions.

When a downstream application agent uses the package without this context, it is
likely to:

```
hand-roll UI that should use package components
choose a nearby but wrong component
miss required accessibility paths
invent prop names from generic UI-library memory
miss package-specific legacy APIs
ignore story-proven composition patterns
copy low-level implementation details instead of using public APIs
```

## Goal

Generate a compact package-consumer skill that turns scattered package knowledge
into procedural guidance.

The skill should answer:

```
What component should I use for this user-interface intent?
Which components should be composed together?
What is the safe public API path?
What should I avoid because it conflicts with this package?
Where should I load more details only when the task needs them?
```

## Non-goals

```
Do not generate a full human documentation site.
Do not teach agents how to maintain the design package.
Do not make the generated skill depend on model-specific hidden behavior.
Do not require automatic postinstall writes into user projects.
Do not treat story examples as the only source of product meaning.
```

## First-principles claim

An agent skill for a design package is valuable when it reduces decision entropy,
not when it merely increases available facts.

Facts:

```
PuFileUpload has modelValue and change.
PuButton has a theme prop.
PuPageHeader exists.
```

Useful procedural knowledge:

```
Use PuFileUpload for drag/drop or URL-based file collection.
Use PuInlineFileUpload only when the upload entry belongs inside a compact form
row or inline surface.
PuButton currently uses legacy theme values; do not replace them with tone in
consumer code.
Use PuPageHeader for a page title with meta and actions instead of building a
custom header.
```

## Failure surface

The biggest risk is generating attractive but inert documentation. The skill
must contain action rules, not only API tables.

The second biggest risk is skill non-invocation. Package-distributed skills need
an explicit loading mechanism in downstream projects. This packet treats
TanStack Intent as the primary solution because it lets installed npm packages
ship and expose version-aligned skills.

