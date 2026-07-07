# Migration Guide

This guide documents consumer action required by breaking or
compatibility-sensitive releases of `@partner-up-dev/ui-uniapp`.

Use `CHANGELOG.md` for the release history. Use this guide when a changelog
entry says a release requires migration work.

## Entries

### Package rename to @partner-up-dev/ui-uniapp

The UniApp package was renamed from `@partner-up-dev/design-uniapp` to
`@partner-up-dev/ui-uniapp`.

Consumer action:

- Replace the package dependency:

```bash
pnpm remove @partner-up-dev/design-uniapp
pnpm add @partner-up-dev/ui-uniapp
```

- Replace imports:

```ts
import '@partner-up-dev/ui-uniapp/styles'
import { PuButton } from '@partner-up-dev/ui-uniapp'
```
