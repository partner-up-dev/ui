# Package Scope

## Unit of generation

Skills are generated per package, not per monorepo.

Reason:

```
Different packages can have different frameworks, runtime constraints,
component APIs, story systems, and distribution needs.
```

Initial package:

```
Package directory: packages/web
Package name: @partner-up-dev/design-web
Framework: Vue 3
Story system: Histoire
Style system: SCSS, CSS variables, optional UnoCSS preset
Generated public registry: src/component-registry.ts
Generated global types: types/components.d.ts
```

Deferred package:

```
Package directory: packages/uniapp
Package name: @partner-up-dev/design-uniapp
Reason deferred: Uni-app has different platform semantics and should have its
own generation script and skill contract.
```

## Consumer-only boundary

The generated skill is for downstream package usage.

It may tell the agent:

```
how to import and register the package
which public components to use
which props, slots, events, and variants are stable consumer APIs
which component combinations are preferred
which package-specific anti-patterns to avoid
```

It must not tell the agent:

```
how to create new package components
how to edit package internals
how to update generated registries
how to run package maintainer verification except as optional source evidence
```

Maintainer workflows belong in repository instructions or a separate maintainer
skill, not in the consumer skill.

## Expected artifact location

The first candidate artifact layout is:

```text
packages/web/
  skills/
    design-web/
      SKILL.md
      references/
        component-map.md
        composition-recipes.md
        usage-rules.md
        components/
          PuButton.md
          PuFileUpload.md
          ...
```

This layout keeps the skill inside the package so npm publishing can include it
and TanStack Intent can discover it from installed dependencies.

