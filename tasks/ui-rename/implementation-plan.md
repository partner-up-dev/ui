# Implementation Plan

## Phase 0: Close Decisions

Before editing implementation files, close the open decisions in
`open-decisions.md`, especially package version strategy and whether the web
UnoCSS preset alias should be added in the same change.

## Phase 1: Package Identity

1. Update root `package.json`:
   - `name`
   - scripts that filter by old package names
   - portless route names that should become `ui-web`
2. Update `packages/web/package.json`:
   - `name`
   - `description`
   - `repository.url`
   - package scripts with `design-web` identity names
3. Update `packages/uniapp/package.json`:
   - `name`
   - `description`
   - `repository.url`
4. Update lockfile through the package manager after manifest edits.

## Phase 2: Source and Generated Package References

1. Update public import references from old package names to new package names.
2. Update web `skill.seed.json`.
3. Regenerate web package generated artifacts:
   - component registry if required by the package scripts
   - generated agent skill references
4. Rename generated skill output path from `design-web` to `ui-web` if the
   generator and published package files support it cleanly.
5. Add or document the `partnerUpUiPreset()` alias decision if approved.

## Phase 3: Documentation and Migration

1. Update root README and contribution docs.
2. Update SVC docs that describe package names, release surface, verification,
   generated skill paths, and deployment.
3. Update package README files.
4. Update package `MIGRATION.md` files with consumer migration commands.
5. Keep historical task records mostly intact unless they contain live commands
   or references that would mislead future agents.

## Phase 4: Release Metadata

1. Decide whether new package names carry forward current versions or restart
   at a lower initial version.
2. Decide changeset strategy:
   - package rename creates new package identities in the registry
   - old package names do not automatically redirect to new package names
3. Add changeset entries if the chosen release workflow needs them for the new
   package names.
4. Ensure old package migration notes are available before publishing the new
   package names.

## Phase 5: Repository Rename

Do this after the local code change is ready:

1. Rename GitHub repository from `partner-up-dev/design` to `partner-up-dev/ui`.
2. Update local remote:

```bash
git remote set-url origin ssh://git@github.com/partner-up-dev/ui
```

3. Verify remote:

```bash
git remote -v
```

## Phase 6: Verification and Record

1. Run the verification matrix.
2. Record results in a future `implementation-record.md`.
3. Confirm docs and generated artifacts are consistent with the new identity.
