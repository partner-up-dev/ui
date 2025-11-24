# PartnerUp Design System (UniApp)

This is the PartnerUp Design System for UniApp, built with Vite, Vue 3, and SCSS.

## Features

- 🎨 **Three-Layer Style Architecture**: Reference tokens, system tokens (with light/dark mode), and component tokens
- 🌓 **Dark Mode Support**: Automatic dark mode based on system preference via `prefers-color-scheme`
- 📦 **NPM Package**: Distributable as an npm package for easy installation
- 🎯 **Type-Safe**: Full TypeScript support with type definitions
- 🔧 **Flexible**: Built with SCSS maps and CSS variables for maximum flexibility

## Architecture

### Three-Layer Token System

#### 1. Reference Tokens (`_ref.scss`)
The foundational layer containing raw design values organized in SCSS maps:
- Color palettes (primary, secondary, tertiary, error, warning, surface, neutral)
- Spacing scales
- Typography scales
- Border radius values
- Shadows
- Icon sizes

#### 2. System Tokens (`_sys.scss`)
The semantic layer that maps reference tokens to system-level tokens:
- **Light Mode**: Default color mappings for light theme
- **Dark Mode**: Alternative color mappings for dark theme
- Automatically switches based on `prefers-color-scheme` media query
- Manual theme control via `data-theme` attribute
- Emits all tokens as CSS variables (e.g., `--sys-color-primary`)

#### 3. Component Tokens (`_component.scss`)
Component-specific tokens that reference system tokens:
- Button tokens (colors, spacing, sizes, radius)
- Card tokens
- Input tokens
- Easy to extend for new components

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
@use '@partner-up/design-uniapp/styles/mixins' as m;

.my-component {
  @include m.typography('title-large');
  @include m.elevation(2);
  @include m.padding('med');
  @include m.radius('med');
  
  background-color: m.getSysColor('surface');
  color: m.getSysColor('on-surface');
}
</style>
```

### Use TypeScript Utilities

```typescript
import { getSysColor, getSysSpacing, setTheme, isDarkMode } from '@partner-up/design-uniapp'

// Get CSS variable references
const primaryColor = getSysColor('primary') // 'var(--sys-color-primary)'
const mediumSpacing = getSysSpacing('med') // 'var(--sys-spacing-med)'

// Control theme
setTheme('dark') // Force dark mode
setTheme('light') // Force light mode
setTheme('auto') // Use system preference

// Check current theme
const darkMode = isDarkMode() // true or false
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

The design system automatically responds to the system's color scheme preference:

```css
/* Light mode is default */
:root {
  --sys-color-primary: #96d945;
  /* ... other tokens */
}

/* Dark mode applies automatically */
@media (prefers-color-scheme: dark) {
  :root {
    --sys-color-primary: #86d43f;
    /* ... other tokens */
  }
}
```

### Manual Theme Control

You can manually control the theme using the `data-theme` attribute:

```typescript
import { setTheme } from '@partner-up/design-uniapp'

// Force dark mode
setTheme('dark')

// Force light mode
setTheme('light')

// Use system preference
setTheme('auto')
```

Or directly in HTML:

```html
<html data-theme="dark">
  <!-- Your app -->
</html>
```

## Development

### Setup

```bash
pnpm install
```

### Build

```bash
pnpm run build
```

### Development

```bash
pnpm run dev
```

### Type Check

```bash
pnpm run type-check
```

## File Structure

```
src/
├── styles/
│   ├── _ref.scss          # Reference tokens (raw values in maps)
│   ├── _sys.scss          # System tokens (light/dark mode, CSS vars)
│   ├── _component.scss    # Component tokens
│   ├── _mixins.scss       # Utility mixins
│   └── index.scss         # Main style entry point
├── components/
│   └── button/
│       └── PuButton.vue   # Example button component
├── utils/
│   └── tokens.ts          # TypeScript utilities for tokens
└── index.ts               # Main entry point
```

## Token Reference

### Colors

System color tokens (available as CSS variables):
- `--sys-color-primary`
- `--sys-color-primary-container`
- `--sys-color-on-primary`
- `--sys-color-secondary`
- `--sys-color-error`
- `--sys-color-warning`
- `--sys-color-surface`
- `--sys-color-on-surface`
- And many more...

### Spacing

- `--sys-spacing-xs` (4px)
- `--sys-spacing-sm` (8px)
- `--sys-spacing-med` (16px)
- `--sys-spacing-lg` (32px)

### Border Radius

- `--sys-radius-none` (0px)
- `--sys-radius-sm` (0px)
- `--sys-radius-med` (8px)
- `--sys-radius-lg` (16px)
- `--sys-radius-full` (50%)

### Shadows

- `--sys-shadow-0` through `--sys-shadow-24`

### Typography

Each typography variant has three CSS variables:
- `--sys-font-{variant}-size`
- `--sys-font-{variant}-weight`
- `--sys-font-{variant}-line-height`

Variants: `display-large`, `headline-large`, `title-large`, `title-medium`, `body-large`, `label-large`, `label-medium`, `label-small`

## Compatibility

The token structure is compatible with the [partner-up-dev/client-uniapp](https://github.com/partner-up-dev/client-uniapp) repository, maintaining the same token values while using a more structured SCSS map approach for better maintainability and scalability.

## Reference

This project structure is inspired by [Moonofweisheng/wot-design-uni](https://github.com/Moonofweisheng/wot-design-uni).

## License

MIT
