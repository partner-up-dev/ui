# @partner-up-dev/ui-web

PartnerUp UI system for Vue web applications.

This package keeps the `Pu*` component API aligned with the UniApp package while using standard web DOM and the token/style implementation from `mvp-HA`.

## Usage

```ts
import { createApp } from 'vue'
import PartnerUpUiWeb from '@partner-up-dev/ui-web'
import '@partner-up-dev/ui-web/styles'

createApp(App).use(PartnerUpUiWeb).mount('#app')
```

Use named component, composable, and type imports from the package root:

```ts
import { PuButton, usePuSelect, type PuButtonFeedback } from '@partner-up-dev/ui-web'
```

Do not import implementation files from `@partner-up-dev/ui-web/components/*`
or `@partner-up-dev/ui-web/src/*`; those paths are not consumer API.

`usePuSelect` provides UI-agnostic single and multiple selection state for
custom option surfaces such as dropdown rows, selectable cards, or checkbox-like
compositions.

## UnoCSS

```ts
import { defineConfig, presetIcons } from 'unocss'
import partnerUpUiPreset from '@partner-up-dev/ui-web/uno'

export default defineConfig({
  presets: [
    partnerUpUiPreset(),
    presetIcons(),
  ],
})
```

`partnerUpUiPreset()` includes the package-owned icon safelist used by
default component UI. Consumers that compose a custom UnoCSS config without the
preset can merge `partnerUpUiSafelist` manually.

```ts
import { partnerUpUiSafelist } from '@partner-up-dev/ui-web/uno'
```
