# Release Runbook

PartnerUp Design publishes packages to GitHub Package Registry through
Changesets and GitHub Actions.

## Registry

```text
https://npm.pkg.github.com
```

Package scope:

```text
@partner-up-dev
```

## Normal Release Flow

1. Make package changes.
2. Add a changeset only for release-worthy package changes.
3. Merge to `main`.
4. The publish workflow creates or updates the version PR.
5. Merge the version PR.
6. The publish workflow runs `pnpm run release`, publishes packages, and creates
   GitHub releases.

## Manual Verification

Before release workflow changes:

```powershell
pnpm changeset status --verbose
```

For package changes, run package-local verification:

```powershell
pnpm --filter @partner-up-dev/design-web run verify
pnpm --filter @partner-up-dev/design-uniapp run type-check
pnpm --filter @partner-up-dev/design-uniapp run build
```

For package releases with breaking API, export, runtime, or package-content
changes, verify the affected package `MIGRATION.md` has a matching consumer
migration entry. If no consumer action is required, the entry should state that
explicitly.

## Republishing An Existing Version

1. Do not add a changeset.
2. Ensure the target package version in `package.json` is the version that
   should be published.
3. Ensure no pending changesets would create a version PR.
4. Trigger the publish workflow from `main`.

## Workflow Owner

The publish workflow lives at:

```text
.github/workflows/publish.yml
```

It checks out the repo, configures Node from `.node-version`, installs pnpm,
restores the pnpm store cache, installs dependencies with the frozen lockfile,
then runs `changesets/action`.

## Rollback Notes

Published npm package versions are immutable in normal registry operation. Treat
bad releases as forward-fix or deprecate/unpublish only under explicit registry
policy review.
