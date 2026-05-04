# Web Atomic Components Migration Packet

Scope:

```
design2/packages/web
+-- migrated from mvp-HA shared ui
+-- public names use Pu* only
+-- InfoRowAction excluded from this packet
```

## PuPageScaffold

Information Architecture:

```
PuPageScaffold
+-- page bounds
    +-- default slot
```

DOM:

```
div.pu-page-scaffold
+-- slot.default
```

Props:

```
(none)
```

Emits:

```
(none)
```

Slots:

```
default
```

## PuPageScaffoldFlow

Information Architecture:

```
PuPageScaffoldFlow
+-- header region
+-- main flow content
+-- actions region
+-- footer region
```

DOM:

```
PuPageScaffold.pu-page-scaffold-flow
+-- slot.header
+-- main.pu-page-scaffold-flow__main
|   +-- slot.default
+-- slot.actions
+-- slot.footer
```

Props:

```
(none)
```

Emits:

```
(none)
```

Slots:

```
header
default
actions
footer
```

## PuPageScaffoldCentered

Information Architecture:

```
PuPageScaffoldCentered
+-- header region
+-- centered main content
+-- actions region
+-- footer region
```

DOM:

```
PuPageScaffold.pu-page-scaffold-centered
+-- slot.header
+-- main.pu-page-scaffold-centered__main
|   +-- slot.default
+-- slot.actions
+-- slot.footer
```

Props:

```
(none)
```

Emits:

```
(none)
```

Slots:

```
header
default
actions
footer
```

## PuFullScreenPageScaffold

Information Architecture:

```
PuFullScreenPageScaffold
+-- full viewport shell
    +-- optional header
    +-- flexible content
    +-- optional footer
```

DOM:

```
PuPageScaffold.pu-full-screen-page-scaffold
+-- header.pu-full-screen-page-scaffold__header
|   +-- slot.header
+-- main.pu-full-screen-page-scaffold__content
|   +-- slot.default
+-- footer.pu-full-screen-page-scaffold__footer
    +-- slot.footer
```

Props:

```
(none)
```

Emits:

```
(none)
```

Slots:

```
header
default
footer
```

## PuFooterRevealPageScaffold

Information Architecture:

```
PuFooterRevealPageScaffold
+-- first-screen viewport
|   +-- optional header
|   +-- content area
+-- revealed footer
```

DOM:

```
PuPageScaffold.pu-footer-reveal-page-scaffold
+-- div.pu-footer-reveal-page-scaffold__viewport
|   +-- header.pu-footer-reveal-page-scaffold__header
|   |   +-- slot.header
|   +-- main.pu-footer-reveal-page-scaffold__content
|       +-- slot.default
+-- footer.pu-footer-reveal-page-scaffold__footer
    +-- slot.footer
```

Props:

```
contentPlacement: "start" | "center" = "start"
```

Emits:

```
(none)
```

Slots:

```
header
default
footer
```

## PuDesktopPageScaffold

Information Architecture:

```
PuDesktopPageScaffold
+-- desktop page layout
    +-- optional header
    +-- responsive shell
        +-- optional sticky aside
        +-- main content
```

DOM:

```
PuPageScaffold.pu-desktop-page-scaffold
+-- div.pu-desktop-page-scaffold__layout
    +-- header.pu-desktop-page-scaffold__header
    |   +-- slot.header
    +-- div.pu-desktop-page-scaffold__shell
        +-- aside.pu-desktop-page-scaffold__aside
        |   +-- slot.aside
        +-- main.pu-desktop-page-scaffold__main
            +-- slot.default
```

Props:

```
(none)
```

Emits:

```
(none)
```

Slots:

```
header
aside
default
```

## PuWheelPicker

Information Architecture:

```
PuWheelPicker
+-- interactive listbox
    +-- viewport
        +-- center highlight
        +-- top fade
        +-- bottom fade
        +-- transformed option list
        +-- empty state
```

DOM:

```
div.pu-wheel-picker[role=listbox]
+-- div.pu-wheel-picker__viewport
    +-- div.pu-wheel-picker__highlight
    +-- div.pu-wheel-picker__fade.pu-wheel-picker__fade--top
    +-- div.pu-wheel-picker__fade.pu-wheel-picker__fade--bottom
    +-- div.pu-wheel-picker__list
    |   +-- button.pu-wheel-picker__option[role=option]*
    |       +-- span.pu-wheel-picker__option-label
    |           +-- slot.option | option.label
    +-- div.pu-wheel-picker__empty
```

Props:

```
modelValue: string | number | null = null
options: readonly { label: string; value: string | number; disabled?: boolean }[]
variant: "surface" | "outline" | "primary" | "secondary" | "tertiary" | "teritary" = "surface"
tone: "surface" | "outline" | "primary" | "secondary" | "tertiary" | "teritary" | undefined
itemHeight: number = 44
visibleCount: number = 5
disabled: boolean = false
ariaLabel: string = "Wheel picker"
emptyLabel: string | null = null
```

Emits:

```
update:modelValue(value: string | number)
change(value: string | number, option: PuWheelPickerOption, index: number)
```

Slots:

```
option({ option, index, active, selected, disabled })
```

## PuToggleSwitch

Information Architecture:

```
PuToggleSwitch
+-- switch control
    +-- text label
    +-- visual track
        +-- thumb
```

DOM:

```
button.pu-toggle-switch[role=switch]
+-- span.pu-toggle-switch__label
+-- span.pu-toggle-switch__track
    +-- span.pu-toggle-switch__thumb
```

Props:

```
modelValue: boolean
label: string
disabled: boolean = false
```

Emits:

```
update:modelValue(value: boolean)
change(value: boolean)
```

Slots:

```
(none)
```

## PuSurfaceCard

Information Architecture:

```
PuSurfaceCard
+-- semantic container
    +-- default slot content
```

DOM:

```
component[as].pu-surface-card
+-- slot.default
```

Props:

```
as: string = "section"
tone: "section" | "inset-high" | "outline" = "section"
gap: "none" | "xs" | "sm" | "md" | "lg" = "sm"
```

Emits:

```
(none)
```

Slots:

```
default
```

## PuExpandableCard

Information Architecture:

```
PuExpandableCard
+-- expandable container
    +-- toggle header
    |   +-- title
    |   +-- optional subtitle
    |   +-- disclosure icon
    +-- collapsible content
```

DOM:

```
section.pu-expandable-card
+-- button.pu-expandable-card__toggle
|   +-- div.pu-expandable-card__header
|   |   +-- h3.pu-expandable-card__title
|   |   +-- p.pu-expandable-card__subtitle
|   +-- span.pu-expandable-card__icon
+-- Transition[name=pu-expandable-card-content]
    +-- div.pu-expandable-card__content
        +-- slot.default
```

Props:

```
title: string
subtitle: string | null = null
defaultExpanded: boolean = false
```

Emits:

```
(none)
```

Slots:

```
default
```

## PuCell

Information Architecture:

```
PuCell
+-- row item
    +-- title side
    +-- right side
        +-- value
        +-- suffix
```

DOM:

```
component[as].pu-cell
+-- div.pu-cell__title
|   +-- slot.title | title
+-- div.pu-cell__right
    +-- div.pu-cell__value
    |   +-- slot.default | value
    +-- span.pu-cell__suffix
        +-- slot.suffix | suffixIcon
```

Props:

```
as: string = "div"
type: "button" | "submit" | "reset" = "button"
border: boolean = false
title: string | undefined
value: string | number | null = null
suffixIcon: string | undefined
```

Emits:

```
(none)
```

Slots:

```
title
default
suffix
```

## PuInfoRow

Information Architecture:

```
PuInfoRow
+-- label/value pair
    +-- optional label
    +-- value
```

DOM:

```
div.pu-info-row
+-- div.pu-info-row__label
|   +-- slot.label | label
+-- div.pu-info-row__value
    +-- slot.default | value
```

Props:

```
label: string | undefined
value: string | number | null = null
layout: "inline" | "stack" = "inline"
align: "start" | "end" = "end"
collapseOnMobile: boolean = true
```

Emits:

```
(none)
```

Slots:

```
label
default
```

## PuModal

Information Architecture:

```
PuModal
+-- body teleport
    +-- overlay
        +-- modal surface
            +-- header slot or title
            +-- default content
```

DOM:

```
Teleport[to=body]
+-- div.pu-modal-overlay
    +-- div.pu-modal
        +-- slot.header | h3.pu-modal__title
        +-- slot.default
```

Props:

```
open: boolean
maxWidth: string = "480px"
title: string | undefined
closeOnOverlay: boolean = true
closeOnEscape: boolean = true
lockScroll: boolean = true
```

Emits:

```
close()
```

Slots:

```
header
default
```

