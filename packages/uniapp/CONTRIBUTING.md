# Contributing to PartnerUp Design System

Thank you for your interest in contributing to the PartnerUp Design System!

## Development Setup

1. **Prerequisites**
   - Node.js 22.12+
   - pnpm 10+

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Development**
   ```bash
   pnpm run dev
   ```
   This starts a development server where you can test components and see changes in real-time.

4. **Build**
   ```bash
   pnpm run build
   ```
   Builds the library for production.

5. **Type Check**
   ```bash
   pnpm run type-check
   ```

## Project Structure

```
src/
├── styles/
│   ├── _ref.scss          # Reference tokens (foundational design values)
│   ├── _sys.scss          # System tokens (light/dark mode, CSS variables)
│   ├── _component.scss    # Component tokens (component-specific)
│   ├── _mixins.scss       # SCSS utility mixins
│   └── index.scss         # Main entry point
├── components/
│   └── button/            # Example: Button component
│       └── PuButton.vue
├── utils/
│   └── tokens.ts          # TypeScript utilities for tokens
├── demo/                  # Demo application
│   ├── App.vue
│   └── main.ts
└── index.ts               # Library entry point
```

## Token Architecture

### Three-Layer System

1. **Reference Layer (`_ref.scss`)**
   - Raw design values in SCSS maps
   - Color palettes, spacing, typography, shadows, etc.
   - Not directly used by components

2. **System Layer (`_sys.scss`)**
   - Semantic tokens that map reference tokens to roles
   - Includes light and dark mode variants
   - Emits CSS variables (e.g., `--sys-color-primary`)
   - Automatically switches based on `prefers-color-scheme`

3. **Component Layer (`_component.scss`)**
   - Component-specific tokens
   - References system layer CSS variables
   - Provides abstraction for component styling

## Adding New Tokens

### Adding a New Color

1. Add to reference layer (`_ref.scss`):
```scss
$ref-colors: (
  // ... existing colors
  info: (
    10: #e3f2fd,
    20: #bbdefb,
    // ... more steps
    100: #0d47a1,
  ),
);
```

2. Add to system layer (`_sys.scss`):
```scss
$sys-colors-light: (
  // ... existing colors
  info: map-get(map-get(ref.$ref-colors, info), 60),
  info-container: map-get(map-get(ref.$ref-colors, info), 20),
  on-info: map-get(map-get(ref.$ref-colors, info), 100),
);

$sys-colors-dark: (
  // ... existing colors
  info: map-get(map-get(ref.$ref-colors, info), 40),
  info-container: map-get(map-get(ref.$ref-colors, info), 80),
  on-info: map-get(map-get(ref.$ref-colors, info), 10),
);
```

3. The tokens will automatically be emitted as CSS variables:
   - `--sys-color-info`
   - `--sys-color-info-container`
   - `--sys-color-on-info`

### Adding a Component Token

Add to component layer (`_component.scss`):

```scss
$my-component-colors: (
  bg: var(--sys-color-surface),
  text: var(--sys-color-on-surface),
  border: var(--sys-color-outline),
);
```

## Creating Components

Follow this structure for new components:

```vue
<template>
  <div :class="['pu-my-component', `pu-my-component--${variant}`]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  variant?: 'default' | 'elevated'
}

withDefaults(defineProps<Props>(), {
  variant: 'default'
})
</script>

<style lang="scss" scoped>
@use '../../styles/mixins' as m;
@use '../../styles/component' as comp;

.pu-my-component {
  // Use system tokens via CSS variables
  background-color: var(--sys-color-surface);
  color: var(--sys-color-on-surface);
  padding: var(--sys-spacing-med);
  border-radius: var(--sys-radius-med);
  
  // Or use mixins
  @include m.elevation(2);
  
  &--elevated {
    @include m.elevation(4);
  }
}
</style>
```

## Best Practices

1. **Always use tokens** - Never hardcode colors, spacing, or other design values
2. **Use CSS variables** - Reference system tokens via `var(--sys-color-primary)` for runtime theme switching
3. **Use mixins** - Leverage utility mixins for common patterns
4. **Type everything** - Use TypeScript for all component props and utilities
5. **Test dark mode** - Always test components in both light and dark modes
6. **Keep it minimal** - Make the smallest necessary changes

## Commit Guidelines

Use conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: add Card component with elevation support
```

## Testing

Before submitting:

1. Build succeeds: `pnpm run build`
2. Type check passes: `pnpm run type-check`
3. Test in demo: `pnpm run dev`
4. Test both light and dark modes
5. Check responsive behavior

## Questions?

Feel free to open an issue for questions or discussions about the design system.
