# Web Composition Principles

This Unit TDD document is the durable source for how
`@partner-up-dev/ui-web` components should be composed in both the design
package and downstream application UI.

The generated Agent Skill excerpts this file directly through
`packages/web/skill.seed.json`.

<!-- agent-skill:start -->
# Composition Principles

Use these principles when building application UI with
`@partner-up-dev/ui-web`.

## Ownership

- Use the package component that owns the semantic or layout responsibility.
- Use `PuPageScaffold` for page-level geometry, viewport mode, content width,
  aside layout, sticky aside, footer placement, and outer page-region padding.
- Use `PuHeader` for page, section, surface, panel, or card title, subtitle,
  metadata, leading content, and inline action structure. Let the owning page
  or surface provide outer padding around the header.
- For standard page titles inside `PuPageScaffold`, prefer the scaffold-owned
  `pageHeader` slot. Reserve the raw `header` slot for custom header chrome
  whose spacing should remain fully consumer-owned.
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
- Use component `padding` and `gap` props backed by the shared spacing scale
  before reaching into component-local spacing variables.
- Use component-local CSS mechanisms for component-specific behavior.
- Do not promote one-off values into design tokens before repeated
  cross-component use proves the abstraction.
- Do not use fluid CSS math as a substitute for semantic tokens.
- Size iconfont glyphs with the em-based `pu-icon` mixin so icons scale with
  surrounding text; the web icon scale is `small: 1.25em`, `medium: 1.5em`,
  and `large: 2.5em`. Do not treat those values as rem tokens.

## Adaptive Layout

- Use container-aware behavior when a layout responds to the space available in
  its parent region.
- Use viewport media queries only when behavior depends on the browser viewport
  or device class.
- Use `clamp()`, `cqw`, `vw`, and related fluid CSS for component-local
  continuous scaling, not for discrete layout ownership.
- Prefer discrete container query states for parent-owned geometry such as
  scaffold aside collapse or list grid collapse.
- Do not infer header action wrapping from container width. When a component
  such as `PuHeader` fixes its action row to inline, keep that choice stable and
  compose around it instead of adding width-driven exceptions.

## Consumer Boundary

- Import public components from the package entry.
- Use public props, slots, events, and exported types from component references.
- Do not depend on `src/components/*`, generated registry internals, or story
  implementation details.
- When using UnoCSS, use the package `./uno` preset or safelist export for
  package-owned built-in icons instead of duplicating UI package internal
  `i-mdi-*` class names in app code.
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
