/**
 * Component type declarations for PartnerUp Design System (UniApp)
 * Provides Vue global component types for IDE support and type checking
 */
declare module 'vue' {
  // Helper for Volar
  export interface GlobalComponents {
    PuButton: typeof import('../src/components/button/puButton.vue')['default']
    PuAccordion: typeof import('../src/components/puAccordion/puAccordion.vue')['default']
    PuAccordionItem: typeof import('../src/components/puAccordion/puAccordionItem.vue')['default']
    PuCheckbox: typeof import('../src/components/puCheckbox/puCheckbox.vue')['default']
    PuCheckboxGroup: typeof import('../src/components/puCheckboxGroup/puCheckboxGroup.vue')['default']
    PuDrawer: typeof import('../src/components/puDrawer/puDrawer.vue')['default']
    PuForm: typeof import('../src/components/puForm/puForm.vue')['default']
    PuFormItem: typeof import('../src/components/puFormItem/puFormItem.vue')['default']
    PuImg: typeof import('../src/components/puImg/puImg.vue')['default']
    PuImgCropper: typeof import('../src/components/puImgCropper/puImgCropper.vue')['default']
    PuInput: typeof import('../src/components/puInput/puInput.vue')['default']
    PuNoticeBar: typeof import('../src/components/puNoticeBar/puNoticeBar.vue')['default']
    PuPicker: typeof import('../src/components/puPicker/puPicker.vue')['default']
    PuScrollView: typeof import('../src/components/puScrollView/puScrollView.vue')['default']
    PuTab: typeof import('../src/components/puTab/puTab.vue')['default']
    PuTabs: typeof import('../src/components/puTabs/puTabs.vue')['default']
    PuTag: typeof import('../src/components/puTag/puTag.vue')['default']
    PuTextarea: typeof import('../src/components/puTextarea/puTextarea.vue')['default']
  }
}

export {}
