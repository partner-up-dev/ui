# Rename Decisions

Status:

```text
Closed for the local implementation.
```

## Package Version Strategy

Decision needed:

- Carry forward existing versions:
  - `@partner-up-dev/ui-web` starts at the current web package version.
  - `@partner-up-dev/ui-uniapp` starts at the current UniApp package version.
- Or restart new package identities at a lower initial version.

Decision:

Use Changesets to publish patch releases under the new package identities. The
new package names preserve continuity through the existing source history while
the release automation records a concrete rename entry.

## Compatibility Shims

Decision needed:

- Publish compatibility packages under the old names.
- Or make the rename a clean package-name migration with documentation only.

Decision:

Do not add runtime shim packages. The old packages keep their final published
versions; consumer migration steps live in package-local `MIGRATION.md` files.

## UnoCSS Preset API Name

Decision needed:

- Add `partnerUpUiPreset()` in the rename change.
- Or leave `partnerUpDesignPreset()` unchanged for now.

Decision:

Add `partnerUpUiPreset()`, `partnerUpUiSafelist`, and
`partnerUpUiIconSafelist`. Do not keep `partnerUpDesign*` compatibility
aliases.

## Generated Skill Path

Decision needed:

- Rename `packages/web/skills/design-web/` to `packages/web/skills/ui-web/`.
- Or keep the path for compatibility with existing skill loading references.

Decision:

Rename to `ui-web`. No duplicate generated `design-web` skill is kept.

## Historical Task Records

Decision needed:

- Leave historical `tasks/` references mostly intact.
- Or rewrite all historical task records to the new names.

Decision:

Leave historical task records mostly intact. Update only live task runbooks for
the portless development route and homelab DNS smoke path.
