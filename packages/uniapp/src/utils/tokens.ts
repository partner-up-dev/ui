/*
 * Design Token Utilities
 * TypeScript utilities for accessing design tokens
 */

// Size type - commonly used in components
export type Size = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge'

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
