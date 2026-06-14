# API Design

## Status

Implemented for the first `PuNumberInput` and `PuSelect` slice.

Accepted inputs:

- Add `PuNumberInput`.
- Add `PuSelect`.
- Steer numeric app state to `PuNumberInput`; do not recommend
  `PuInput nativeType="number"` for `number | null` state.
- `PuSelect` is a general web-native select component, not only a dense admin
  component.
- Do not add `density` in the first API. Reuse `size`.

## Shared Field Control Contract

Both components should follow the normalized field-control vocabulary already
used by `PuInput` and `PuTextarea`:

```ts
type PuNumberInputSize = PuSize;
type PuNumberInputVariant = PuFieldVariant;
type PuNumberInputTone = PuTone;

type PuSelectSize = PuSize;
type PuSelectVariant = PuFieldVariant;
type PuSelectTone = PuTone;
```

Shared props:

```ts
id?: string;
name?: string;
disabled?: boolean;
readonly?: boolean;
invalid?: boolean;
size?: PuSize;              // default: "md"
variant?: PuFieldVariant;   // default: "outline"
tone?: PuTone;              // default: "neutral"
```

Shared composition rules:

- Labels, hints, required markers, and visible errors stay in `PuFormItem`.
- Controls expose native focus targets.
- `class` and `style` apply to the component root; other undeclared attrs,
  including `aria-*`, pass through to the native control.
- Controls emit `focus` and `blur` with native focus events.
- Controls emit `update:modelValue` for controlled state.
- Controls emit `change` for committed value changes.

## PuNumberInput

### Intent

Use `PuNumberInput` for numeric app state. It exists because the native input
element exposes text while application models commonly need `number | null`.

Do not document `PuInput nativeType="number"` as the recommended path for
numeric state. If kept, it is a string-backed native input escape hatch.

### Types

```ts
export type PuNumberInputValue = number | null;
export type PuNumberInputStep = number | "any";
export type PuNumberInputAlign = PuAlign;
export type PuNumberInputSize = PuSize;
export type PuNumberInputVariant = PuFieldVariant;
export type PuNumberInputTone = PuTone;
```

### Props

```ts
export const puNumberInputProps = {
  modelValue: {
    type: Number as PropType<PuNumberInputValue>,
    default: null,
  },
  id: makeStringProp<string | undefined>(undefined),
  name: makeStringProp<string | undefined>(undefined),
  placeholder: makeStringProp(""),
  autocomplete: makeStringProp<string | undefined>(undefined),
  inputmode: {
    type: String as PropType<PuInputMode | undefined>,
    default: undefined,
  },
  min: {
    type: Number as PropType<number | undefined>,
    default: undefined,
  },
  max: {
    type: Number as PropType<number | undefined>,
    default: undefined,
  },
  step: {
    type: [Number, String] as PropType<PuNumberInputStep | undefined>,
    default: undefined,
  },
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  invalid: makeBooleanProp(false),
  align: {
    type: String as PropType<PuNumberInputAlign>,
    default: "start",
  },
  size: {
    type: String as PropType<PuNumberInputSize>,
    default: "md",
  },
  variant: {
    type: String as PropType<PuNumberInputVariant>,
    default: "outline",
  },
  tone: {
    type: String as PropType<PuNumberInputTone>,
    default: "neutral",
  },
  clearable: makeBooleanProp(false),
};
```

Notes:

- Use `step: number | "any"` because native number inputs accept `step="any"`.
- Do not add `precision`, `formatter`, `parser`, `clamp`, or locale props in
  the first API. Those should wait for repeated concrete needs.

### Emits

```ts
export const puNumberInputEmits = {
  "update:modelValue": (_value: PuNumberInputValue) => true,
  change: (_value: PuNumberInputValue, _event: Event) => true,
  focus: (_event: FocusEvent) => true,
  blur: (_event: FocusEvent) => true,
  clear: () => true,
};
```

### Value Semantics

- Empty input emits `update:modelValue(null)`.
- Valid numeric input emits `update:modelValue(number)`.
- Invalid intermediate text is allowed visually while editing, but does not
  emit a misleading number.
- On commit, invalid intermediate text should revert to the last accepted
  `modelValue`.
- `change` fires only for committed value changes.
- `clear` sets the value to `null`, emits `update:modelValue(null)`, and keeps
  focus on the input.

### Native Behavior

- Render a native input with number-compatible attributes.
- Forward `min`, `max`, and `step`.
- Use `HTMLInputElement.validity.badInput` to distinguish invalid intermediate
  numeric text from a deliberate empty value.
- Respect native disabled, readonly, focus, blur, and form submission behavior.
- Use `inputmode` only as a keyboard hint; it must not replace numeric parsing.

### Story Coverage

- Controlled `number | null`.
- Empty state.
- Min, max, and step.
- Decimal value with `step`.
- Invalid intermediate text behavior.
- Clearable state.
- Disabled, readonly, invalid.
- `PuFormItem` composition.

## PuSelect

### Intent

Use `PuSelect` for web-native one-of-many selection when picker/drawer
interaction is not the right product behavior.

`PuSelect` should fit normal product forms, settings, filters, and admin
editors. It should not be framed as admin-only.

### Types

```ts
export type PuSelectValue = string | number | null;
export type PuSelectSize = PuSize;
export type PuSelectVariant = PuFieldVariant;
export type PuSelectTone = PuTone;

export interface PuSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
```

Deferred:

- option groups
- multi-select
- async loading
- custom option rendering
- combobox/autocomplete behavior

### Props

```ts
export const puSelectProps = {
  modelValue: {
    type: [String, Number] as PropType<PuSelectValue>,
    default: null,
  },
  options: {
    type: Array as PropType<PuSelectOption[]>,
    default: () => [],
  },
  id: makeStringProp<string | undefined>(undefined),
  name: makeStringProp<string | undefined>(undefined),
  placeholder: makeStringProp<string | undefined>(undefined),
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  invalid: makeBooleanProp(false),
  clearable: makeBooleanProp(false),
  size: {
    type: String as PropType<PuSelectSize>,
    default: "md",
  },
  variant: {
    type: String as PropType<PuSelectVariant>,
    default: "outline",
  },
  tone: {
    type: String as PropType<PuSelectTone>,
    default: "neutral",
  },
};
```

Notes:

- Reuse `size`; do not add `density`.
- Keep option values to `string | number` in the first API.
- Avoid options whose values stringify to the same native value in the same
  select; native form submission serializes option values as strings.
- Use `null` for no selection.
- `readonly` is not native for `<select>`; the implementation keeps the control
  focusable, sets `aria-readonly`, and blocks value-changing pointer/keyboard
  interaction.

### Emits

```ts
export const puSelectEmits = {
  "update:modelValue": (_value: PuSelectValue) => true,
  change: (
    _value: PuSelectValue,
    _option: PuSelectOption | undefined,
    _event: Event,
  ) => true,
  focus: (_event: FocusEvent) => true,
  blur: (_event: FocusEvent) => true,
};
```

### Placeholder And Clearable Semantics

- `placeholder` renders a no-selection option.
- With `clearable=false`, the placeholder is only an initial prompt and should
  not be selectable after a real value is chosen.
- With `clearable=true`, the placeholder/no-selection option remains selectable
  and emits `null`.
- If no placeholder is provided and `modelValue` is `null`, the native select
  should render an empty value state without inventing a label.

### Native Behavior

- Prefer a native `<select>` root inside the package field shell.
- Preserve native keyboard and screen-reader behavior.
- Forward `id`, `name`, `disabled`, focus, blur, and native form participation.
- Do not implement custom listbox behavior in the first API unless native
  select proves insufficient.

### Story Coverage

- Controlled selection.
- Placeholder.
- Clearable null selection.
- Disabled select.
- Disabled options.
- String and number values.
- `size` variants.
- Field variants and invalid state.
- `PuFormItem` composition.
