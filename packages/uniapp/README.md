# @partner-up/design-uniapp

PartnerUp Design System for UniApp, built with Vite, Vue 3, and SCSS.

## Features

- 🎨 **Three-Layer Style Architecture**: Reference tokens, system tokens (with light/dark mode), and component tokens
- 🌓 **Dark Mode Support**: Automatic dark mode based on system preference via `prefers-color-scheme`
- 📦 **NPM Package**: Distributable as an npm package for easy installation
- 🎯 **Type-Safe**: Full TypeScript support with type definitions
- 🔧 **Flexible**: Built with SCSS maps and CSS variables for maximum flexibility

## Installation

```bash
pnpm install @partner-up/design-uniapp
```

## Usage

### Import Styles

```typescript
// In your main.ts or App.vue
import '@partner-up/design-uniapp/styles'
```

### Use CSS Variables

```vue
<template>
  <div class="my-component">
    <h1>Hello World</h1>
  </div>
</template>

<style scoped>
.my-component {
  background-color: var(--sys-color-surface);
  color: var(--sys-color-on-surface);
  padding: var(--sys-spacing-med);
  border-radius: var(--sys-radius-med);
  box-shadow: var(--sys-shadow-2);
}
</style>
```

### Use SCSS Mixins

```vue
<style lang="scss" scoped>
// Mixins are auto-injected via Vite's additionalData
.my-component {
  @include pu-font('title-large');
  @include pu-elevation(2);
  @include pu-padding('med');
  @include pu-radius('med');
  
  background-color: var(--sys-color-surface);
  color: var(--sys-color-on-surface);
}
</style>
```

### Use SASS directly

```scss
// Import in your SCSS files
@use '@partner-up/design-uniapp/sass' as *;
```

### Use Components

```vue
<template>
  <PuButton variant="primary" size="medium" @click="handleClick">
    Click Me
  </PuButton>
</template>

<script setup lang="ts">
import { PuButton } from '@partner-up/design-uniapp'

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

## Theme Support

### Automatic Dark Mode

The design system automatically responds to the system's color scheme preference via `@media (prefers-color-scheme: dark)`.

### Manual Theme Control

```typescript
import { setTheme } from '@partner-up/design-uniapp'

setTheme('dark')  // Force dark mode
setTheme('light') // Force light mode
setTheme('auto')  // Use system preference
```

Or use data attribute:

```html
<html data-theme="dark">
  <!-- Your app -->
</html>
```

## Architecture

### Three-Layer Token System

1. **Reference Layer (`_ref.scss`)**: Raw design values stored in nested SCSS maps (W3C DTCG aligned)
2. **System Layer (`_sys.scss`)**: Semantic tokens with light/dark mode support
3. **Component Layer (`_component.scss`)**: Component-specific tokens using CSS variables

All tokens are emitted as CSS variables for runtime theme switching.

## Development

```bash
# Install dependencies
pnpm install

# Development server
pnpm run dev

# Build
pnpm run build

# Type check
pnpm run type-check
```

## License

MIT
