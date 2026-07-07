---
"@partner-up-dev/ui-web": patch
"@partner-up-dev/ui-uniapp": patch
---

Rename the published package identities from design to UI.

Consumers should migrate from `@partner-up-dev/design-web` to
`@partner-up-dev/ui-web` and from `@partner-up-dev/design-uniapp` to
`@partner-up-dev/ui-uniapp`. The web UnoCSS preset now exposes
`partnerUpUiPreset()` and `partnerUpUiSafelist` under the UI package identity;
the previous `partnerUpDesign*` exports were removed.
