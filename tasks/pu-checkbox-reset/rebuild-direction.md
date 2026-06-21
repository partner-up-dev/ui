# PuCheckbox Reset Rebuild Direction

## Reference Scope

The reference component is a visual input, not an API or template contract.
The rebuild does not need to copy its `checked` prop, root structure, or
UniApp-only template shape.

The higher-order requirement is consistency with current package norms:

```text
token-driven styling
square-corner rectangular defaults
calm package-local visual language
web package interaction and accessibility behavior
```

## Reference Visual Shape

The reference component is intentionally small:

```text
props:
+-- checked: boolean

template:
+-- root view.checkbox
+-- is-checked class when checked
+-- check mark text only when checked

visual:
+-- small square box, reference uses 18px by 18px
+-- 1px outline variant border
+-- no border radius
+-- centered 12px check mark
+-- primary background and border when checked
+-- on-primary check color
+-- transition on visual state
```

## What The Reference Does Not Decide

The reference does not decide the future public API. These remain design
choices for the rebuild:

```text
label rendering
group ownership
min/max validation
trueValue / falseValue
custom shape modes
button or bar variants
inline layout
disabled state
keyboard behavior
form field integration
custom color prop
custom class props
```

Accepted API direction:

```text
Use `modelValue` as the controlled value contract rather than a separate
`checked` prop.

Use the shared `PuSize` vocabulary for size:

size?: "sm" | "md" | "lg"
default: "md"

Use the shared `PuTone` vocabulary for tone:

tone?: "neutral" | "primary" | "secondary" | "tertiary" | "danger"
default: "primary"
```

The next public checkbox should still avoid inheriting the old API by accident.
Any retained API should be justified by current package conventions or concrete
consumer needs, not by compatibility with the rejected implementation.

## First-Principles Contract Direction

A checkbox primitive has two separable responsibilities:

```text
1. visual checked indicator
2. interactive form control semantics
```

The reference mainly informs the first responsibility. The design-system rebuild
should decide explicitly whether PuCheckbox owns both responsibilities based on
web package conventions and accessibility.

## Suggested Next Design Packet Questions

For a future rebuild, answer these before implementation:

```text
1. Does PuCheckbox render a native input or a button-backed checkbox control?
2. Does the component include label text, or does PuFormItem / parent layout own
   labeling?
3. Is PuCheckboxGroup a durable design-system primitive, or should app-level
   multi-select own grouping until a stronger contract appears?
4. Which states are required for the first rebuilt web release: disabled, readonly,
   error, focus-visible, indeterminate, loading?
5. If any visual treatment prop beyond `size` and `tone` is added, which
   existing shared vocabulary owns it: `PuControlVariant` or `PuFieldVariant`?
```

## Taste Direction

Prefer a narrow, square-corner, token-driven checkbox with a small API. Use
rem-based sizing or package tokens instead of hardcoded px values. Implement
the box, icon, spacing, and focus ring across `sm`, `md`, and `lg` without
introducing checkbox-only size names. Support common tones without inventing
checkbox-only color names. Align with existing package style and component
contracts before matching the reference literally. Avoid variant sprawl until a
concrete consuming surface proves the need.
