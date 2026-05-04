/*
 * Main Entry Point for PartnerUp Design System (Web)
 * Exports all components, styles, and utilities.
 */

import type { App } from 'vue'

import './styles/index.scss'

export * from './utils'

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
import PuPicker from './components/puPicker/puPicker.vue'
import PuScrollView from './components/puScrollView/puScrollView.vue'
import PuTab from './components/puTab/puTab.vue'
import PuTabs from './components/puTabs/puTabs.vue'
import PuTag from './components/puTag/puTag.vue'
import PuTextarea from './components/puTextarea/puTextarea.vue'

export const version = '0.1.0'

const components = [
  ['PuButton', PuButton],
  ['PuAccordion', PuAccordion],
  ['PuAccordionItem', PuAccordionItem],
  ['PuCheckbox', PuCheckbox],
  ['PuCheckboxGroup', PuCheckboxGroup],
  ['PuDrawer', PuDrawer],
  ['PuForm', PuForm],
  ['PuFormItem', PuFormItem],
  ['PuImg', PuImg],
  ['PuImgCropper', PuImgCropper],
  ['PuInput', PuInput],
  ['PuNoticeBar', PuNoticeBar],
  ['PuPicker', PuPicker],
  ['PuScrollView', PuScrollView],
  ['PuTab', PuTab],
  ['PuTabs', PuTabs],
  ['PuTag', PuTag],
  ['PuTextarea', PuTextarea]
] as const

export function install(app: App): void {
  components.forEach(([name, component]) => {
    app.component(name, component)
  })
}

export {
  PuButton,
  PuAccordion,
  PuAccordionItem,
  PuCheckbox,
  PuCheckboxGroup,
  PuDrawer,
  PuForm,
  PuFormItem,
  PuImg,
  PuImgCropper,
  PuInput,
  PuNoticeBar,
  PuPicker,
  PuScrollView,
  PuTab,
  PuTabs,
  PuTag,
  PuTextarea
}

export default {
  install,
  version
}
