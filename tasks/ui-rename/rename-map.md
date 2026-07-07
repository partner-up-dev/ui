# Rename Map

## Rename

| Current | Target | Notes |
| --- | --- | --- |
| `partner-up-dev/design` | `partner-up-dev/ui` | GitHub repository name. |
| `ssh://git@github.com/partner-up-dev/design` | `ssh://git@github.com/partner-up-dev/ui` | Local Git remote after repository rename. |
| `https://github.com/partner-up-dev/design.git` | `https://github.com/partner-up-dev/ui.git` | Package `repository.url` metadata. |
| `@partner-up-dev/design` | `@partner-up-dev/ui` | Private root package. |
| `@partner-up-dev/design-web` | `@partner-up-dev/ui-web` | Web package install and import name. |
| `@partner-up-dev/design-uniapp` | `@partner-up-dev/ui-uniapp` | UniApp package install and import name. |
| `PartnerUp Design` | `PartnerUp UI` | Repository/product title contexts. |
| `PartnerUp Design Web` | `PartnerUp UI Web` | Generated web skill display name. |
| `design-web` | `ui-web` | Development route, portless name, generated skill name where identity-facing. |
| `design-uniapp` | `ui-uniapp` | Package identity references. |
| `packages/web/skills/design-web/` | `packages/web/skills/ui-web/` | Generated skill output path if tooling supports path rename cleanly. |

## Keep Unless Context Proves Otherwise

| Term | Reason |
| --- | --- |
| `design system` | Describes the product category, not only the package name. |
| `design tokens` | Standard design-system terminology. |
| `design style foundation` | Existing technical/design concept. |
| `design padding`, `design value`, `design guidance` | Domain language in docs and code comments. |
| `Pu*` component names | Component API naming is separate from package identity. |
| `packages/web`, `packages/uniapp` | These are platform package folders and still clear. |

## UnoCSS API Rename

The web package previously exposed `partnerUpDesignPreset()` from the UnoCSS
preset entry. That name was public API under the old package identity.

Implemented migration path:

- Add `partnerUpUiPreset()` as the recommended export.
- Remove `partnerUpDesignPreset()` during the rename.
- Replace `partnerUpDesignSafelist` and `partnerUpDesignIconSafelist` with
  `partnerUpUiSafelist` and `partnerUpUiIconSafelist`.
- Document the preferred replacement in `packages/web/MIGRATION.md`.
