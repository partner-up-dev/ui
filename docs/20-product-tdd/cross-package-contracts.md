# Cross-Package Contracts

This file owns compatibility policy between `@partner-up-dev/ui-web` and
`@partner-up-dev/ui-uniapp`.

## Public Naming

- Public components use the `Pu*` prefix.
- Keep broad API shape aligned where platform constraints allow.
- Platform-specific behavior may differ when DOM accessibility, UniApp runtime
  constraints, or packaging models require it.

## Alignment Policy

Use Product TDD when a change affects more than one package:

- shared component naming
- token vocabulary
- exported type expectations
- package entry points
- release contents
- generated docs or skill references that represent package API

Use Unit TDD when the change is internal to one package and does not force the
other package to adapt.

## Compatibility Rule

Do not make downstream consumers depend on implementation files unless the
package explicitly exports that path. Public contracts should be represented by
package exports, README usage, generated skill references, or TDD docs.
