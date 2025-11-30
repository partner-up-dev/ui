/*
 * Main Entry Point for PartnerUp Design System (UniApp)
 * Exports all components, styles, and utilities
 */

// Re-export style utilities for TypeScript usage
export * from './utils/tokens'
export * from './utils/props'
export * from './utils/vue'

// Component exports
export { default as PuButton } from './components/puButton/puButton.vue'
export * from './components/puButton/puButton'

// Accordion
export { default as PuAccordion } from './components/puAccordion/puAccordion.vue'
export * from './components/puAccordion/puAccordion'
export { default as PuAccordionItem } from './components/puAccordion/puAccordionItem.vue'
export * from './components/puAccordion/puAccordionItem'

// Checkbox
export { default as PuCheckbox } from './components/puCheckbox/puCheckbox.vue'
export * from './components/puCheckbox/puCheckbox'

// CheckboxGroup
export { default as PuCheckboxGroup } from './components/puCheckboxGroup/puCheckboxGroup.vue'
export * from './components/puCheckboxGroup/puCheckboxGroup'

// Drawer
export { default as PuDrawer } from './components/puDrawer/puDrawer.vue'
export * from './components/puDrawer/puDrawer'

// Form
export { default as PuForm } from './components/puForm/puForm.vue'
export * from './components/puForm/puForm'

// FormItem
export { default as PuFormItem } from './components/puFormItem/puFormItem.vue'
export * from './components/puFormItem/puFormItem'

// Img
export { default as PuImg } from './components/puImg/puImg.vue'
export * from './components/puImg/puImg'

// ImgCropper
export { default as PuImgCropper } from './components/puImgCropper/puImgCropper.vue'
export * from './components/puImgCropper/puImgCropper'

// Input
export { default as PuInput } from './components/puInput/puInput.vue'
export * from './components/puInput/puInput'

// NoticeBar
export { default as PuNoticeBar } from './components/puNoticeBar/puNoticeBar.vue'
export * from './components/puNoticeBar/puNoticeBar'

// Tab
export { default as PuTab } from './components/puTab/puTab.vue'
export * from './components/puTab/puTab'

// Tabs
export { default as PuTabs } from './components/puTabs/puTabs.vue'
export * from './components/puTabs/puTabs'

// Tag
export { default as PuTag } from './components/puTag/puTag.vue'
export * from './components/puTag/puTag'

// Textarea
export { default as PuTextarea } from './components/puTextarea/puTextarea.vue'
export * from './components/puTextarea/puTextarea'

// Picker
export { default as PuPicker } from './components/puPicker/puPicker.vue'
export * from './components/puPicker/puPicker'

// ScrollView
export { default as PuScrollView } from './components/puScrollView/puScrollView.vue'
export * from './components/puScrollView/puScrollView'

// Version
export const version = '0.1.0'

// Install function for Vue
import type { App } from 'vue'
import PuButton from './components/puButton/puButton.vue'
import PuAccordion from './components/puAccordion/puAccordion.vue'
import PuAccordionItem from './components/puAccordion/puAccordionItem.vue'
import PuCheckbox from './components/puCheckbox/puCheckbox.vue'
import PuCheckboxGroup from './components/puCheckboxGroup/puCheckboxGroup.vue'
import PuDrawer from './components/puDrawer/puDrawer.vue'
import PuForm from './components/puForm/puForm.vue'
import PuFormItem from './components/puFormItem/puFormItem.vue'
import PuImg from './components/puImg/puImg.vue'
import PuImgCropper from './components/puImgCropper/puImgCropper.vue'
import PuInput from './components/puInput/puInput.vue'
import PuNoticeBar from './components/puNoticeBar/puNoticeBar.vue'
import PuTab from './components/puTab/puTab.vue'
import PuTabs from './components/puTabs/puTabs.vue'
import PuTag from './components/puTag/puTag.vue'
import PuTextarea from './components/puTextarea/puTextarea.vue'
import PuPicker from './components/puPicker/puPicker.vue'
import PuScrollView from './components/puScrollView/puScrollView.vue'

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
  app.component('PuImgCropper', PuImgCropper)
  app.component('PuInput', PuInput)
  app.component('PuNoticeBar', PuNoticeBar)
  app.component('PuTab', PuTab)
  app.component('PuTabs', PuTabs)
  app.component('PuTag', PuTag)
  app.component('PuTextarea', PuTextarea)
  app.component('PuPicker', PuPicker)
  app.component('PuScrollView', PuScrollView)
}

// Default export
export default {
  install,
  version
}
