/*
 * Design Token Utilities
 * Runtime helpers for the web token implementation.
 */

export type Size = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
export type LegacySize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge'
export type Theme = 'light' | 'dark' | 'auto'

export function normalizeSize(size: Size | LegacySize): Size {
  if (size === 'xSmall') return 'xsmall'
  if (size === 'xLarge') return 'xlarge'
  return size
}

export function setTheme(theme: Theme): void {
  if (typeof document === 'undefined') return

  const root = document.documentElement

  if (theme === 'auto') {
    root.removeAttribute('data-theme')
    return
  }

  root.setAttribute('data-theme', theme)
}

export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'auto'

  const theme = document.documentElement.getAttribute('data-theme')

  if (theme === 'light' || theme === 'dark') {
    return theme
  }

  return 'auto'
}

export function isDarkMode(): boolean {
  const theme = getTheme()

  if (theme === 'dark') return true
  if (theme === 'light') return false

  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}
