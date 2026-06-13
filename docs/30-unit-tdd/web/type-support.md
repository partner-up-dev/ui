# Web Type Support

This Unit TDD document is the durable source for TypeScript and Vue global
component support in `@partner-up-dev/design-web`.

The generated Agent Skill excerpts this file directly through
`packages/web/skill.seed.json`.

<!-- agent-skill:start -->
# Type Support

Use these rules when importing `@partner-up-dev/design-web` components or
component-related TypeScript types in downstream Vue apps.

## Public Imports

- Import component values from the package root:
  `import { PuButton } from '@partner-up-dev/design-web'`.
- Import shared and component-specific TypeScript types from the package root:
  `import type { PuButtonFeedback, PuAction } from '@partner-up-dev/design-web'`.
- Do not import from `@partner-up-dev/design-web/components/*`,
  `@partner-up-dev/design-web/src/*`, generated registry internals, or raw
  implementation files.

## Global Components

- The package root type entry includes Vue `GlobalComponents` declarations for
  public `Pu*` components.
- Global component declarations reference the package root public exports, not
  raw `src/components/*.vue` files.
- When a consuming app registers the plugin globally, keep at least one normal
  or type-only import from `@partner-up-dev/design-web` in the TypeScript
  program so the global declarations are visible to `vue-tsc`.

## Styles

- Import built CSS or Sass through the published style entries documented by
  the package.
- Treat styles and Sass as styling entries only; do not use them to reach
  component implementation files.
<!-- agent-skill:end -->

## Maintainer Notes

The published package must be closed over its own declarations. A packed
consumer with `skipLibCheck: false` must be able to import the package root,
component values, component-specific helper types, and Vue global component
declarations without depending on unpublished source directories.
