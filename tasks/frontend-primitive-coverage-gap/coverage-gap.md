# Frontend Primitive Coverage Gap

Date: 2026-06-07

## Coverage Boundary

Covered means a component is publicly exported from:

```
packages/web/src/component-registry.ts
```

The current public design-web component set covers these broad intents:

```
actions: PuButton
forms: PuForm, PuFormItem, PuInput, PuTextarea, PuCheckbox,
       PuCheckboxGroup, PuToggleSwitch, PuPicker, PuWheelPicker,
       PuFileUpload, PuFilesUpload, PuImgCropper
display: PuAccordion, PuAnnouncementBar, PuBentoGrid, PuBentoItem,
         PuCard, PuCell, PuCellGroup, PuChip, PuChipGroup,
         PuDescriptionList, PuDescriptionItem, PuEmptyState, PuImg,
         PuInlineNotice, PuPageHeader, PuSegmented, PuSegmentedItem,
         PuSkeleton, PuTabs, PuTab, PuTag
overlay: PuDrawer, PuModal
layout: PuPageScaffold, PuScrollView
```

## Already Covered By Public Design-Web APIs

These mvp-HA shared UI primitives are covered by public Pu* components or are
already compatibility wrappers over them:

```
Button.vue -> PuButton
SurfaceCard.vue -> PuCard compatibility wrapper
PageScaffold.vue -> PuPageScaffold compatibility wrapper
PageScaffoldFlow.vue -> PuPageScaffold compatibility wrapper
PageScaffoldCentered.vue -> PuPageScaffold compatibility wrapper
FullScreenPageScaffold.vue -> PuPageScaffold compatibility wrapper
FooterRevealPageScaffold.vue -> PuPageScaffold compatibility wrapper
DesktopPageScaffold.vue -> PuPageScaffold compatibility wrapper
FormField.vue -> PuFormItem
TextInput.vue -> PuInput
TextareaInput.vue -> PuTextarea
ToggleSwitch.vue -> PuToggleSwitch
WheelPicker.vue -> PuWheelPicker
SegmentedControl.vue -> PuSegmented / PuSegmentedItem
Cell.vue -> PuCell
Chip.vue -> PuChip
ChipGroup.vue -> PuChipGroup
InfoRow.vue -> PuDescriptionList / PuDescriptionItem for grouped facts
InfoRowAction.vue -> PuDescriptionItem action slot for trailing affordances
InlineNotice.vue -> PuInlineNotice compatibility wrapper
EmptyState.vue -> PuEmptyState
Modal.vue -> PuModal
```

## Clear Design-System Gaps

These primitives have no equivalent public Pu* component today:

| mvp-HA primitive | Missing design-web intent |
| --- | --- |
| `actions/ActionLink.vue` | Link-styled action with `to`, `href`, external target, disabled behavior, and button-like visual treatment. |
| `actions/FeedbackButton.vue` | Transient action button states beyond loading: idle, pending, success, and error. |
| `containers/ChoiceCard.vue` | Selectable button/router-link card with active and disabled states. |
| `display/FitChipGroup.vue` | Single-line chip group that measures available width and renders only fully fitting chips. |
| `overlay/ConfirmDialog.vue` | Standard confirm/cancel dialog composition on top of modal behavior. |
| `feedback/LoadingIndicator.vue` | Region-level spinner/loading state with optional message. |
| `feedback/ErrorToast.vue` | Toast/snackbar feedback with dismiss behavior. |
| `identity/Avatar.vue` | Avatar image with fallback initial, shape, size, and optional border. |
| `forms/ProductLocalDateCalendarPicker.vue` | Calendar/date picker mechanics. Current source is product-local and should be generalized before design-system work. |
| `forms/MultiStopToggle.vue` | Multi-stop toggle/slider control with keyboard support and discrete option labels. |

## Partial Coverage

These are not total gaps, but the public design-web API does not cover all
mvp-HA behavior:

| mvp-HA primitive | Current design-web coverage | Remaining difference |
| --- | --- | --- |
| `containers/ExpandableCard.vue` | `PuCard` supports collapsible content. | mvp-HA version has `keepContentMounted`, `expandedResetKey`, and a specific motion/content retention contract. |
| `overlay/BottomDrawer.vue` | `PuDrawer` is a bottom drawer and has stronger focus and scroll behavior. | mvp-HA version has footer slot, close reason payloads, `maxWidth`, `minHeight`, and a slightly different open API. |
| `navigation/TabBar.vue` | `PuTabs` / `PuTab` cover tab semantics. | mvp-HA version is data-driven, horizontally scrolling, pill-styled, auto-scrolls the active tab, and has an append slot. |
| `navigation/PageHeader.vue` | `PuPageHeader` covers title, subtitle, metadata, and actions. | mvp-HA version owns router back fallback behavior, which is application navigation policy. |

## Shared UI That Should Stay Application-Owned

These live under `src/shared/ui`, but they include app/product/platform policy
and should not be treated as design-system primitive gaps as-is:

```
sections/PageFooter.vue
sections/APRNotificationSubscriptions.vue
sections/WeChatNotificationSubscriptionsCard.vue
forms/TimelinePolicyPicker.vue
```

## Domain Primitives

These are not covered by design-web, but they are domain-owned compositions.
They should remain in mvp-HA unless a lower-level reusable primitive is extracted:

```
domains/pr/ui/primitives/PRStatusBadge.vue
domains/pr/ui/primitives/PRRosterItem.vue
domains/pr/ui/primitives/PRPreviewCardFrame.vue
domains/pr/ui/primitives/PRPreviewCard.vue
domains/share/ui/primitives/WechatChatPreview.vue
domains/event/ui/primitives/FormModeLongPressButton.vue
domains/event/ui/primitives/EventPRCreateCard.vue
domains/event/ui/primitives/EventDummyPRCard.vue
domains/event/ui/primitives/EventCard.vue
domains/event/ui/primitives/AnchorEventDemandCard.vue
domains/event/ui/primitives/AnchorEventBetaGroupQrPanel.vue
domains/event/ui/primitives/AnchorEventBetaGroupCard.vue
```

Generalization notes:

```
PRStatusBadge can be composed from PuTag or PuChip after status-to-tone mapping
stays in the PR domain.

EventCard and PRPreviewCard expose useful stress cases for cards, chips, image
fallbacks, and action rows, but their route, status, backend, and copy contracts
are domain-specific.

FormModeLongPressButton and AnchorEventDemandCard contain specialized motion
and gesture behavior. Extract only after a second non-event use case exists.
```

## Recommended Implementation Order

```
1. PuAvatar
   Low domain coupling and clear repeated consumer value.

2. PuConfirmDialog
   Thin composition over PuModal and PuButton. Small API surface and high reuse.

3. PuButton action contract
   Expand PuButton instead of adding PuActionLink or PuFeedbackButton. Use a
   structured `action` prop for native button, href, and RouterLink targets.
   Avoid flat href/to/native props so visual state and action target remain
   separate.

4. PuChoiceCard
   Extract after the action link strategy is decided because selectable card
   navigation depends on the same root-element contract.

5. PuFitChipGroup
   Useful for dense card/list metadata. Needs DOM measurement tests or visual
   stories because the behavior is layout-sensitive.

6. Drawer and TabBar API alignment
   Compare mvp-HA API differences with existing PuDrawer and PuTabs before
   adding separate public components.
```

## Verification Gates For Future Work

```
pnpm --filter @partner-up-dev/design-web run generate
pnpm --filter @partner-up-dev/design-web run skill:generate
pnpm --filter @partner-up-dev/design-web run verify
```

Any public component addition should also update Histoire stories and generated
component references so downstream agents can choose the component without
reading implementation files.

## PuButton Action Contract Decision

Decision date: 2026-06-08

```
Use PuButton as the unified primitive for command buttons, link-styled actions,
and transient feedback buttons.
```

New API direction:

```
type PuAction =
  | { native?: "button" | "submit" | "reset" }
  | { href: string; external?: boolean; target?: string; rel?: string }
  | { to: unknown }

shape?: "rect" | "pill" | "circle"
tone?: "primary" | "secondary" | "tertiary" | "neutral" | "danger"
variant?: "solid" | "soft" | "outline" | "ghost" | "dashed"
size?: "sm" | "md" | "lg"
feedback?: "idle" | "pending" | "success" | "error"
loading?: boolean
disabled?: boolean
block?: boolean
```

Compatibility decision:

```
Do not preserve the old PuButton legacy props. The package is still early enough
to clean the public contract before application migration.

Remove:
- text
- prefixIcon
- suffixIcon
- showDot
- toggled
- active
- theme
- type
- rounded
- customStyle
```

Reasoning:

```
The old `type` prop described visual structure with values `WithText`,
`OnlyIcon`, and `Bar`. In button APIs, `type` should mean native HTML button
type. The new contract avoids this ambiguity by putting native behavior under
`action.native` and using slots for visual structure.
```

Implementation record:

```
packages/web/src/components/puButton/puButton.ts
  - replaces legacy text/theme/type/prefixIcon/suffixIcon/customStyle props
    with action, shape, tone, variant, size, feedback, loading, disabled, and block
  - imports the shared PuAction target type
  - exports PuButtonFeedback for transient action feedback

packages/web/src/components/puButton/puButton.vue
  - renders button, a, or globally registered RouterLink based on action
  - supports default, leading, and trailing slots
  - blocks disabled or pending link navigation with preventDefault and
    stopPropagation

packages/web/src/components/puButton/puButton.scss
  - adds rect/pill/circle shape, canonical tones, control variants, sm/md/lg sizing, block width,
    icon-only layout, pending loading spinner, success, and error feedback

packages/web/src/types/action.ts
packages/web/src/types/index.ts
  - extracts PuAction, PuNativeAction, PuHrefAction, and PuRouteAction as shared
    package types for later PuCard reuse

packages/web/src/stories/actions/PuButton.story.vue
  - replaces legacy examples with tones, variants, shapes, action targets,
    slots/block, and feedback states

packages/web/src/stories/**/*
  - migrates existing PuButton story usages from text/theme/legacy size props
    to slots, tone, variant, and canonical size values

packages/web/skill.seed.json
packages/web/skills/design-web/references/components/PuButton.md
packages/web/skills/design-web/references/usage-rules.md
  - updates generated agent-facing component references
```

Verification:

```
pnpm --filter @partner-up-dev/design-web exec vue-tsc --noEmit
  passed

pnpm --filter @partner-up-dev/design-web run generate
  passed; generated files already up to date

pnpm --filter @partner-up-dev/design-web run skill:generate
  passed; generated 44 files
  existing warning: Component PuScrollView has no matching story coverage

pnpm --filter @partner-up-dev/design-web run verify
  passed
  existing warning: Component PuScrollView has no matching story coverage
  existing warning: Group layout not found for PuPageScaffold.story.vue
```

## PuTabs And PuTab API Alignment Decision

Decision date: 2026-06-08

```
Do not add a separate public PuTabBar component.

Treat mvp-HA `navigation/TabBar.vue` as a source compatibility gap whose
reusable behavior belongs in PuTabs and PuTab. PuTabs remains the public
primitive for section tabs, indexed view switching, and TabBar-style horizontal
tab navigation.
```

New API direction:

```ts
type PuTabsVariant = "line" | "pill";
type PuTabValue = string | number;

type PuTabItem = {
  value: PuTabValue;
  label: string;
  showDot?: boolean;
  disabled?: boolean;
};
```

Vocabulary decision:

```
Use the shared PuSize vocabulary from packages/web/src/types/variants.ts for
PuTabs and PuTab size props.

Keep PuTabsVariant local to the tabs contract because line and pill describe
tab presentation, not the shared PuControlVariant treatment vocabulary.
```

Compatibility decision:

```
Do not preserve the old PuTabs and PuTab legacy props. The package is still
early enough to clean the public contract before application migration.

Remove:
- legacy size values: Large, Medium, Small
- index-only modelValue assumptions
- `tabs[].text`

Replace with:
- size values: sm, md, lg
- value-based modelValue
- `tabs[].label`
```

Implementation direction:

```
PuTabs
  - owns tablist semantics, value selection, keyboard navigation, active item
    auto-scroll, horizontal overflow, and append slot placement
  - accepts variant and shared PuSize, then passes visual state to PuTab
  - emits update:modelValue with the selected value
  - emits change with value, index, and tab payload

PuTab
  - owns single-tab visual rendering
  - supports line and pill variants
  - supports sm, md, and lg sizing
  - receives active, disabled, showDot, label, variant, and shared PuSize
```

Behavior to carry forward from the mvp-HA TabBar primitive:

```
- data-driven item list
- horizontally scrolling tab row
- pill-styled variant
- active tab auto-scroll
- append slot for trailing controls
```
