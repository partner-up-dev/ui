/*
 * Main Entry Point for PartnerUp UI System (UniApp)
 * Exports all components, styles, and utilities
 */

export * from './utils/vue'
export * from './utils/props'
export * from './utils/tokens'

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
