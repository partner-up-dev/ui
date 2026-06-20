# @partner-up-dev/design-web

PartnerUp Design System for Vue web applications.

This package keeps the `Pu*` component API aligned with the UniApp package while using standard web DOM and the token/style implementation from `mvp-HA`.

## Usage

```ts
import { createApp } from 'vue'
import PartnerUpDesignWeb from '@partner-up-dev/design-web'
import '@partner-up-dev/design-web/styles'

createApp(App).use(PartnerUpDesignWeb).mount('#app')
```

Use named component, composable, and type imports from the package root:

```ts
import { PuButton, usePuSelect, type PuButtonFeedback } from '@partner-up-dev/design-web'
```

Do not import implementation files from `@partner-up-dev/design-web/components/*`
or `@partner-up-dev/design-web/src/*`; those paths are not consumer API.

`usePuSelect` provides UI-agnostic single and multiple selection state for
custom option surfaces such as dropdown rows, selectable cards, or checkbox-like
compositions.

## UnoCSS

```ts
import { defineConfig, presetIcons } from 'unocss'
import partnerUpDesignPreset from '@partner-up-dev/design-web/uno'

export default defineConfig({
  presets: [
    partnerUpDesignPreset(),
    presetIcons(),
  ],
})
```

`partnerUpDesignPreset()` includes the package-owned icon safelist used by
default component UI. Consumers that compose a custom UnoCSS config without the
preset can merge `partnerUpDesignSafelist` manually.

```ts
import { partnerUpDesignSafelist } from '@partner-up-dev/design-web/uno'
```
