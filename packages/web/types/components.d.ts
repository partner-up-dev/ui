/**
 * Component type declarations for PartnerUp Design System (Web)
 * Provides Vue global component types for IDE support and type checking.
 */
declare module 'vue' {
  export interface GlobalComponents {
    PuButton: typeof import('../src/components/puButton/puButton.vue')['default']
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
    PuPageScaffold: typeof import('../src/components/puPageScaffold/puPageScaffold.vue')['default']
    PuPageScaffoldFlow: typeof import('../src/components/puPageScaffoldFlow/puPageScaffoldFlow.vue')['default']
    PuPageScaffoldCentered: typeof import('../src/components/puPageScaffoldCentered/puPageScaffoldCentered.vue')['default']
    PuFullScreenPageScaffold: typeof import('../src/components/puFullScreenPageScaffold/puFullScreenPageScaffold.vue')['default']
    PuFooterRevealPageScaffold: typeof import('../src/components/puFooterRevealPageScaffold/puFooterRevealPageScaffold.vue')['default']
    PuDesktopPageScaffold: typeof import('../src/components/puDesktopPageScaffold/puDesktopPageScaffold.vue')['default']
    PuWheelPicker: typeof import('../src/components/puWheelPicker/puWheelPicker.vue')['default']
    PuToggleSwitch: typeof import('../src/components/puToggleSwitch/puToggleSwitch.vue')['default']
    PuSurfaceCard: typeof import('../src/components/puSurfaceCard/puSurfaceCard.vue')['default']
    PuExpandableCard: typeof import('../src/components/puExpandableCard/puExpandableCard.vue')['default']
    PuCell: typeof import('../src/components/puCell/puCell.vue')['default']
    PuInfoRow: typeof import('../src/components/puInfoRow/puInfoRow.vue')['default']
    PuModal: typeof import('../src/components/puModal/puModal.vue')['default']
  }
}

export {}
