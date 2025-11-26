/*
 * Main Entry Point for PartnerUp Design System (UniApp)
 * Exports all components, styles, and utilities
 */

// Export styles (users can import and use CSS variables)
import './styles/index.scss'

// Re-export style utilities for TypeScript usage
export * from './utils/tokens'
export * from './utils/props'
export * from './utils/vue'

// Component exports
export { default as PuButton } from './components/button/puButton.vue'
export * from './components/button/puButton'

// Accordion
export { default as PuAccordion } from './components/PUAccordion/puAccordion.vue'
export * from './components/PUAccordion/puAccordion'
export { default as PuAccordionItem } from './components/PUAccordion/puAccordionItem.vue'
export * from './components/PUAccordion/puAccordionItem'

// Checkbox
export { default as PuCheckbox } from './components/PUCheckbox/puCheckbox.vue'
export * from './components/PUCheckbox/puCheckbox'

// CheckboxGroup
export { default as PuCheckboxGroup } from './components/PUCheckboxGroup/puCheckboxGroup.vue'
export * from './components/PUCheckboxGroup/puCheckboxGroup'

// Drawer
export { default as PuDrawer } from './components/PUDrawer/puDrawer.vue'
export * from './components/PUDrawer/puDrawer'

// Form
export { default as PuForm } from './components/PUForm/puForm.vue'
export * from './components/PUForm/puForm'

// FormItem
export { default as PuFormItem } from './components/PUFormItem/puFormItem.vue'
export * from './components/PUFormItem/puFormItem'

// Img
export { default as PuImg } from './components/PUImg/puImg.vue'
export * from './components/PUImg/puImg'

// Input
export { default as PuInput } from './components/PUInput/puInput.vue'
export * from './components/PUInput/puInput'

// NoticeBar
export { default as PuNoticeBar } from './components/PUNoticeBar/puNoticeBar.vue'
export * from './components/PUNoticeBar/puNoticeBar'

// Tab
export { default as PuTab } from './components/PUTab/puTab.vue'
export * from './components/PUTab/puTab'

// Tabs
export { default as PuTabs } from './components/PUTabs/puTabs.vue'
export * from './components/PUTabs/puTabs'

// Tag
export { default as PuTag } from './components/PUTag/puTag.vue'
export * from './components/PUTag/puTag'

// Textarea
export { default as PuTextarea } from './components/PUTextarea/puTextarea.vue'
export * from './components/PUTextarea/puTextarea'

// Version
export const version = '0.1.0'

// Install function for Vue
import type { App } from 'vue'
import PuButton from './components/button/puButton.vue'
import PuAccordion from './components/PUAccordion/puAccordion.vue'
import PuAccordionItem from './components/PUAccordion/puAccordionItem.vue'
import PuCheckbox from './components/PUCheckbox/puCheckbox.vue'
import PuCheckboxGroup from './components/PUCheckboxGroup/puCheckboxGroup.vue'
import PuDrawer from './components/PUDrawer/puDrawer.vue'
import PuForm from './components/PUForm/puForm.vue'
import PuFormItem from './components/PUFormItem/puFormItem.vue'
import PuImg from './components/PUImg/puImg.vue'
import PuInput from './components/PUInput/puInput.vue'
import PuNoticeBar from './components/PUNoticeBar/puNoticeBar.vue'
import PuTab from './components/PUTab/puTab.vue'
import PuTabs from './components/PUTabs/puTabs.vue'
import PuTag from './components/PUTag/puTag.vue'
import PuTextarea from './components/PUTextarea/puTextarea.vue'

export function install(app: App): void {
  // Register all components
  app.component('PuButton', PuButton)
  app.component('PuAccordion', PuAccordion)
  app.component('PuAccordionItem', PuAccordionItem)
  app.component('PuCheckbox', PuCheckbox)
  app.component('PuCheckboxGroup', PuCheckboxGroup)
  app.component('PuDrawer', PuDrawer)
  app.component('PuForm', PuForm)
  app.component('PuFormItem', PuFormItem)
  app.component('PuImg', PuImg)
  app.component('PuInput', PuInput)
  app.component('PuNoticeBar', PuNoticeBar)
  app.component('PuTab', PuTab)
  app.component('PuTabs', PuTabs)
  app.component('PuTag', PuTag)
  app.component('PuTextarea', PuTextarea)
}

// Default export
export default {
  install,
  version
}
