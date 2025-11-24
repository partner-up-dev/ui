/*
 * Main Entry Point for PartnerUp Design System (UniApp)
 * Exports all components, styles, and utilities
 */

// Export styles (users can import and use CSS variables)
import './styles/index.scss'

// Re-export style utilities for TypeScript usage
export * from './utils/tokens'

// Example component exports (add as components are created)
// export { default as PuButton } from './components/button/PuButton.vue'
// export { default as PuCard } from './components/card/PuCard.vue'

// Version
export const version = '0.1.0'

// Install function for Vue
import type { App } from 'vue'

export function install(_app: App): void {
  // Register all components here when available
  console.log('PartnerUp Design System installed')
}

// Default export
export default {
  install,
  version
}
