# Verification Matrix

## Generated Drift

Run after component registry or public docs/skill changes:

```powershell
pnpm --filter @partner-up-dev/design-web run generate:check
pnpm --filter @partner-up-dev/design-web run skill:generate:check
```

Run after intentionally updating generated artifacts:

```powershell
pnpm --filter @partner-up-dev/design-web run generate
pnpm --filter @partner-up-dev/design-web run skill:generate
```

## Package Checks

```powershell
pnpm --filter @partner-up-dev/design-web run type-check
pnpm --filter @partner-up-dev/design-web run build
pnpm --filter @partner-up-dev/design-web run check:packed-types
```

## Story Checks

```powershell
pnpm --filter @partner-up-dev/design-web run story:coverage
pnpm --filter @partner-up-dev/design-web run story:build
```

For new interactive select/autocomplete behavior, add manual Histoire checks
until a browser test harness exists:

- mouse selection
- keyboard navigation
- focus return
- disabled options
- screen-reader labels and roles
- dense layout at narrow and wide story viewports

## Full Gate

Before considering broad web package form changes complete:

```powershell
pnpm --filter @partner-up-dev/design-web run verify
```

## Changeset Rule

Add a focused changeset for public package API, runtime behavior, packed
contents, or consumer-facing package documentation changes.

Do not add a changeset for task-packet-only edits.

