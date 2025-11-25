/*
 * Main Entry Point for PartnerUp Design System (UniApp)
 * Exports all components, styles, and utilities
 */

// Export styles (users can import and use CSS variables)
import './styles/index.scss'

// Re-export style utilities for TypeScript usage
export * from './utils/tokens'
export * from './utils/props'

// Component exports
export { default as PuButton } from './components/button/puButton.vue'
export * from './components/button/puButton'

// Version
export const version = '0.1.0'

// Install function for Vue
import type { App } from 'vue'
import PuButton from './components/button/puButton.vue'

export function install(app: App): void {
  // Register all components
  app.component('PuButton', PuButton)
}

// Default export
export default {
  install,
  version
}
