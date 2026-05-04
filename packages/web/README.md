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

## UnoCSS

```ts
import partnerUpDesignPreset from '@partner-up-dev/design-web/uno'
```
