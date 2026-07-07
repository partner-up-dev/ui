# Verification Matrix

## Static Search

Run broad searches after implementation:

```bash
rg -n "@partner-up-dev/design|partner-up-dev/design|PartnerUp Design|design-web|design-uniapp" -S --glob '!node_modules' --glob '!dist' --glob '!.histoire/dist'
```

Expected outcome:

- No identity-facing stale references remain.
- Remaining matches are historical task records or valid domain-language uses.

## Package Checks

From the repository root:

```bash
pnpm install
pnpm --filter @partner-up-dev/ui-web run verify
pnpm --filter @partner-up-dev/ui-uniapp run type-check
pnpm --filter @partner-up-dev/ui-uniapp run build
pnpm run build
```

Expected outcome:

- Workspace filters resolve with the new package names.
- Web generated checks pass with the new skill/package identity.
- Package builds complete.

## Changesets and Publish Dry Run

```bash
pnpm changeset status --verbose
pnpm --filter @partner-up-dev/ui-web pack --pack-destination /tmp
pnpm --filter @partner-up-dev/ui-uniapp pack --pack-destination /tmp
```

Expected outcome:

- Changesets output matches the chosen release strategy.
- Packed package metadata contains the new names and repository URL.
- Packed package contents include renamed generated skill paths if the path is
  part of the published package.

## Development Server Naming

If portless development route names are changed:

```bash
pnpm dev:ensure --foreground
```

Expected outcome:

- The web story server reports the new `ui-web` route.
- No user-facing route still reports `design-web`.

## Repository Remote

After the GitHub repository is renamed:

```bash
git remote -v
git ls-remote origin HEAD
```

Expected outcome:

- `origin` points to `ssh://git@github.com/partner-up-dev/ui`.
- Remote access succeeds.
