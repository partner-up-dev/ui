/*
 * Design Token Utilities
 * TypeScript utilities for accessing design tokens
 */

// Color families
export const colorFamilies = [
  'primary',
  'secondary',
  'tertiary',
  'error',
  'warning',
  'surface',
  'neutral',
  'neutral-variant'
] as const

export type ColorFamily = typeof colorFamilies[number]

// Color steps
export const colorSteps = [10, 20, 30, 40, 50, 60, 70, 80, 90, 96, 100] as const
export type ColorStep = typeof colorSteps[number]

// Spacing sizes
export const spacingSizes = ['xs', 'sm', 'med', 'lg'] as const
export type SpacingSize = typeof spacingSizes[number]

// Radius sizes
export const radiusSizes = ['none', 'xs', 'sm', 'med', 'lg', 'full'] as const
export type RadiusSize = typeof radiusSizes[number]

// Size options
export const sizes = ['xSmall', 'small', 'medium', 'large', 'xLarge'] as const
export type Size = typeof sizes[number]

// Icon sizes
export const iconSizes = ['small', 'medium', 'large'] as const
export type IconSize = typeof iconSizes[number]

// Shadow levels
export const shadowLevels = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24] as const
export type ShadowLevel = typeof shadowLevels[number]

// Typography variants
export const typographyVariants = [
  'display-large',
  'headline-large',
  'title-large',
  'title-medium',
  'body-large',
  'label-large',
  'label-medium',
  'label-small'
] as const
export type TypographyVariant = typeof typographyVariants[number]

// System color tokens (semantic names)
export const systemColorTokens = [
  'primary',
  'primary-container',
  'on-primary',
  'on-primary-container',
  'secondary',
  'secondary-container',
  'on-secondary',
  'tertiary',
  'tertiary-container',
  'on-tertiary',
  'error',
  'error-container',
  'on-error',
  'warning',
  'on-warning',
  'surface',
  'surface-container',
  'surface-container-low',
  'surface-container-lowest',
  'surface-container-highest',
  'on-surface',
  'on-surface-variant',
  'neutral',
  'neutral-container',
  'on-neutral',
  'outline',
  'outline-variant',
  'green',
  'red',
  'yellow',
  'blue'
] as const
export type SystemColorToken = typeof systemColorTokens[number]

/**
 * Get a CSS variable reference for a system color token
 * @param token - The system color token name
 * @returns CSS variable string
 */
export function getSysColor(token: SystemColorToken): string {
  return `var(--sys-color-${token})`
}

/**
 * Get a CSS variable reference for a spacing size
 * @param size - The spacing size
 * @returns CSS variable string
 */
export function getSysSpacing(size: SpacingSize): string {
  return `var(--sys-spacing-${size})`
}

/**
 * Get a CSS variable reference for a border radius
 * @param size - The radius size
 * @returns CSS variable string
 */
export function getSysRadius(size: RadiusSize): string {
  return `var(--sys-radius-${size})`
}

/**
 * Get a CSS variable reference for a shadow level
 * @param level - The shadow level
 * @returns CSS variable string
 */
export function getSysShadow(level: ShadowLevel): string {
  return `var(--sys-shadow-${level})`
}

/**
 * Get a CSS variable reference for a typography property
 * @param variant - The typography variant
 * @param property - The property (size, weight, or line-height)
 * @returns CSS variable string
 */
export function getSysTypography(
  variant: TypographyVariant,
  property: 'size' | 'weight' | 'line-height'
): string {
  return `var(--sys-font-${variant}-${property})`
}

/**
 * Helper to set theme programmatically
 * @param theme - 'light', 'dark', or 'auto'
 */
export function setTheme(theme: 'light' | 'dark' | 'auto'): void {
  const root = document.documentElement
  
  if (theme === 'auto') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', theme)
  }
}

/**
 * Get the current theme
 * @returns 'light', 'dark', or 'auto'
 */
export function getTheme(): 'light' | 'dark' | 'auto' {
  const root = document.documentElement
  const theme = root.getAttribute('data-theme')
  
  if (theme === 'light' || theme === 'dark') {
    return theme
  }
  
  return 'auto'
}

/**
 * Check if dark mode is currently active
 * @returns true if dark mode is active
 */
export function isDarkMode(): boolean {
  const theme = getTheme()
  
  if (theme === 'dark') return true
  if (theme === 'light') return false
  
  // Auto mode - check system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  return false
}
