/*
 * Main Entry Point for PartnerUp Design System (Web)
 * Exports all components, styles, and utilities.
 */

import type { App } from 'vue'

import './styles/index.scss'
import components from './component-registry'
import { version } from './version'

export * from './utils'
export * from './types'
export * from './composables'
export * from './component-registry'
export { version } from './version'

export function install(app: App): void {
  components.forEach(([name, component]) => {
    app.component(name, component)
  })
}

export default {
  install,
  version
}
