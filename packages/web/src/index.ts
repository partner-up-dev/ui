/*
 * Main Entry Point for PartnerUp Design System (Web)
 * Exports all components, styles, and utilities.
 */

import type { App } from 'vue'

import './styles/index.scss'

export * from './utils'
export * from './types'
export * from './composables'
export * from './component-registry'
export type * from '../types/components'
import components from './component-registry'

export const version = '0.1.0'

export function install(app: App): void {
  components.forEach(([name, component]) => {
    app.component(name, component)
  })
}

export default {
  install,
  version
}
