# Changelog

## 0.1.4

### Patch Changes

- da346de: fix exports of styles/\*

## 0.1.3

### Patch Changes

- 918b665: Fix issue using the package:

  - Add default exports of `./styles`

  Trivia optimization:

  - Inject additionalData only to sass under `components/`
  - Remove forward of `ref`, `sys` in `index.scss` since user should use CSS variables.

## 0.1.2

### Patch Changes

- 47081dc: Export styles in sass format following web-design pattern

  - Added `./styles` export with sass format (`{ "sass": "./lib/styles/index.scss" }`)
  - Added `./styles/mixins` export (`{ "sass": "./lib/styles/_mixins.scss" }`)
  - Added `build:styles` script to copy src/styles to lib/styles at build time

## 0.1.1

### Patch Changes

- d6b89a0: Initial setup for publishing to GitHub Package Registry with changesets

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-24

### Added

- Initial setup of PartnerUp Design System for UniApp
- Three-layer token architecture:
  - Reference tokens (`_ref.scss`) with SCSS maps
  - System tokens (`_sys.scss`) with light/dark mode support
  - Component tokens (`_component.scss`) for component-specific styling
- CSS variable emission from SCSS maps using `@each` loops
- Automatic dark mode support via `prefers-color-scheme` media query
- Manual theme control via `data-theme` attribute
- TypeScript utilities for token access:
  - `getSysColor()`, `getSysSpacing()`, `getSysRadius()`, `getSysShadow()`
  - `setTheme()`, `getTheme()`, `isDarkMode()`
- Utility mixins for common styling patterns
- Example button component (`PuButton.vue`) demonstrating token usage
- Demo application showcasing all design tokens
- Comprehensive README with usage examples
- Contributing guidelines
- Build configuration with Vite + Vue 3
- TypeScript support

### Token Structure

- **Colors**: Primary, Secondary, Tertiary, Error, Warning, Surface, Neutral
- **Spacing**: xs (4px), sm (8px), med (16px), lg (32px)
- **Radius**: none, xs, sm, med (8px), lg (16px), full (50%)
- **Shadows**: 11 elevation levels (0-24)
- **Typography**: 8 variants (display, headline, title, body, label)
- **Sizes**: xSmall (20px), small (24px), medium (32px), large (44px), xLarge (60px)

### Compatibility

- Token values match `partner-up-dev/client-uniapp` repository
- Structure inspired by `Moonofweisheng/wot-design-uni`

[0.1.0]: https://github.com/partner-up-dev/design/releases/tag/v0.1.0
