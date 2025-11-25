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
export { default as PuAccordion } from './components/accordion/puAccordion.vue'
export * from './components/accordion/puAccordion'
export { default as PuAccordionItem } from './components/accordion/puAccordionItem.vue'
export * from './components/accordion/puAccordionItem'

// Checkbox
export { default as PuCheckbox } from './components/checkbox/puCheckbox.vue'
export * from './components/checkbox/puCheckbox'

// CheckboxGroup
export { default as PuCheckboxGroup } from './components/checkboxGroup/puCheckboxGroup.vue'
export * from './components/checkboxGroup/puCheckboxGroup'

// Drawer
export { default as PuDrawer } from './components/drawer/puDrawer.vue'
export * from './components/drawer/puDrawer'

// Form
export { default as PuForm } from './components/form/puForm.vue'
export * from './components/form/puForm'

// FormItem
export { default as PuFormItem } from './components/formItem/puFormItem.vue'
export * from './components/formItem/puFormItem'

// Img
export { default as PuImg } from './components/img/puImg.vue'
export * from './components/img/puImg'

// Input
export { default as PuInput } from './components/input/puInput.vue'
export * from './components/input/puInput'

// NoticeBar
export { default as PuNoticeBar } from './components/noticeBar/puNoticeBar.vue'
export * from './components/noticeBar/puNoticeBar'

// Tab
export { default as PuTab } from './components/tab/puTab.vue'
export * from './components/tab/puTab'

// Tabs
export { default as PuTabs } from './components/tabs/puTabs.vue'
export * from './components/tabs/puTabs'

// Tag
export { default as PuTag } from './components/tag/puTag.vue'
export * from './components/tag/puTag'

// Textarea
export { default as PuTextarea } from './components/textarea/puTextarea.vue'
export * from './components/textarea/puTextarea'

// Version
export const version = '0.1.0'

// Install function for Vue
import type { App } from 'vue'
import PuButton from './components/button/puButton.vue'
import PuAccordion from './components/accordion/puAccordion.vue'
import PuAccordionItem from './components/accordion/puAccordionItem.vue'
import PuCheckbox from './components/checkbox/puCheckbox.vue'
import PuCheckboxGroup from './components/checkboxGroup/puCheckboxGroup.vue'
import PuDrawer from './components/drawer/puDrawer.vue'
import PuForm from './components/form/puForm.vue'
import PuFormItem from './components/formItem/puFormItem.vue'
import PuImg from './components/img/puImg.vue'
import PuInput from './components/input/puInput.vue'
import PuNoticeBar from './components/noticeBar/puNoticeBar.vue'
import PuTab from './components/tab/puTab.vue'
import PuTabs from './components/tabs/puTabs.vue'
import PuTag from './components/tag/puTag.vue'
import PuTextarea from './components/textarea/puTextarea.vue'

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
