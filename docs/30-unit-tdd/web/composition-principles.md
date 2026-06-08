# Web Composition Principles

This Unit TDD document is the durable source for how
`@partner-up-dev/design-web` components should be composed in both the design
package and downstream application UI.

The generated Agent Skill excerpts this file directly through
`packages/web/skill.seed.json`.

<!-- agent-skill:start -->
# Composition Principles

Use these principles when building application UI with
`@partner-up-dev/design-web`.

## Ownership

- Use the package component that owns the semantic or layout responsibility.
- Use `PuPageScaffold` for page-level geometry, viewport mode, content width,
  aside layout, sticky aside, and footer placement.
- Use `PuPageHeader` for page title, subtitle, metadata, back affordance, and
  actions.
- Do not recreate package-owned structure with custom wrapper markup or
  app-level CSS.

## Composition First

- Compose package components before writing custom UI.
- Use component props and slots before adding local layout wrappers.
- Use app-owned CSS only for composition that the package does not cover.
- Keep story helper classes and package internals out of client code.

## Tokens And Local CSS

- Use tokens for shared semantic roles: color, typography, spacing, radius, and
  repeatable system rhythm.
- Use component-local CSS mechanisms for component-specific behavior.
- Do not promote one-off values into design tokens before repeated
  cross-component use proves the abstraction.
- Do not use fluid CSS math as a substitute for semantic tokens.

## Adaptive Layout

- Use container-aware behavior when a layout responds to the space available in
  its parent region.
- Use viewport media queries only when behavior depends on the browser viewport
  or device class.
- Use `clamp()`, `cqw`, `vw`, and related fluid CSS for component-local
  continuous scaling, not for discrete layout ownership.
- Prefer discrete container query states for stacking, aside collapse, and
  action wrapping.

## Consumer Boundary

- Import public components from the package entry.
- Use public props, slots, events, and exported types from component references.
- Do not depend on `src/components/*`, generated registry internals, or story
  implementation details.
<!-- agent-skill:end -->

## Maintainer Notes

Container queries should be introduced at real layout ownership boundaries, not
arbitrary leaf nodes. `container-type: inline-size` introduces containment
behavior, so it should be applied where the component owns the measured region.

Name query containers after the owning component or region:

```scss
.pu-page-scaffold {
  container: pu-page / inline-size;
}

@container pu-page (max-width: 56.25rem) {
  .pu-page-scaffold--layout-aside .pu-page-scaffold__shell {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

Viewport media queries remain appropriate for document-level shell behavior,
safe-area handling, and device-class ergonomics.
