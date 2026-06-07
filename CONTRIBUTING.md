# Contributing to PartnerUp Design

This repository is mostly changed through small, reviewable package work. Release
metadata should describe package behavior, not CI mechanics.

## Commit Policy

- Use Conventional Commits for commits that may reach `main`.
- Use scopes that match the affected owner, such as `web`, `uniapp`, `release`, `docs`, or `workspace`.
- Use `feat` for release-worthy new behavior.
- Use `fix` for release-worthy correctness changes.
- Use `docs`, `chore`, `refactor`, `test`, or `build` only when the change should not imply new package behavior.
- Mark breaking package API changes with `!` or a `BREAKING CHANGE:` footer.

## Changeset Policy

- Use `pnpm changeset` when a package version should change.
- Select only the packages whose public API, package contents, runtime behavior, or consumer-facing documentation changed.
- Write summaries as package changelog entries. Avoid summaries such as "update CI" unless the CI change changes the package release contract.
- Do not add a changeset when the goal is to republish an already-versioned package that was not published to the registry.
- Do not manually bump package versions except for explicit release automation recovery.

## Release Policy

The repository uses Changesets and GitHub Actions to publish packages to GitHub
Package Registry.

- Package registry: `https://npm.pkg.github.com`
- Package scope: `@partner-up-dev`
- Root release command: `pnpm run release`
- Publish workflow: `.github/workflows/publish.yml`

Normal release flow:

1. Add package changes.
2. Add a changeset for release-worthy package changes.
3. Merge the generated version PR.
4. The publish workflow builds packages, runs `changeset publish`, publishes packages, and creates GitHub Releases.

Republishing an existing version:

1. Do not add a changeset.
2. Ensure the target package version in `package.json` is the version that should be published.
3. Ensure there are no pending changesets that would create a version PR.
4. Trigger the publish workflow from `main`; `changeset publish` will attempt to publish unpublished package versions.

## Verification Policy

- Run package-local verification for the package you changed.
- For web package changes, prefer `pnpm --filter @partner-up-dev/design-web run verify`.
- For UniApp package changes, run at least `pnpm --filter @partner-up-dev/design-uniapp run type-check` and `pnpm --filter @partner-up-dev/design-uniapp run build`.
- For release workflow changes, run `pnpm changeset status --verbose` and inspect the workflow diff.
