# Histoire Story Taxonomy

## Goal

Make the web package Histoire navigation easier to scan without changing public
component APIs or moving story files.

## Decision

- Keep Histoire `group` values as the stable first-level buckets:
  `actions`, `forms`, `display`, `layout`, and `overlay`.
- Add second-level navigation through `histoire.config.ts` `tree.file` mapping
  instead of encoding taxonomy into every story title.
- Move `PuImgCropper` into the `forms` story group because it is an image editing
  input, not passive image display.
- Keep `PuCard`, `PuPageHeader`, `PuPageScaffold`, `PuScrollView`, `PuDrawer`,
  and `PuSnackbar` directly under their first-level groups.

## Current Model

- Forms:
  - Fields: `PuInput`, `PuTextarea`, `PuNumberInput`, `PuChipInput`,
    `PuChipsEditor`
  - Selection: `PuCheckbox`, `PuCheckboxGroup`, `PuSelect`, `PuPicker`,
    `PuWheelPicker`, `PuToggleSwitch`, `PuMultiStopToggle`
  - Other: `PuFileUpload`, `PuFilesUpload`, `PuImgCropper`
  - Meta: `PuForm`
- Display:
  - root: `PuCard`
  - Content: `PuCell`, `PuDescriptionList`, `PuImg`
  - Status: `PuAnnouncementBar`, `PuInlineNotice`, `PuEmptyState`,
    `PuLoadingState`, `PuSkeleton`, `PuSpinner`
  - Navigation: `PuTabs`, `PuSegmented`
  - Tags: `PuChip`, `PuTag`
- Layout:
  - root: `PuPageHeader`, `PuPageScaffold`, `PuScrollView`
  - Groups: `PuCellGroup`, `PuBentoGrid`, `PuAccordion`
- Overlay:
  - root: `PuDrawer`, `PuSnackbar`
  - Dialogs: `PuDialog`, `PuModal`
  - Panels: `PuFloatPanel`
