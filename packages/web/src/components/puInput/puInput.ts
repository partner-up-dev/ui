import type { PropType } from "vue";
import {
  puAligns,
  puFieldVariants,
  puSizes,
  puTones,
  type PuAlign,
  type PuFieldVariant,
  type PuSize,
  type PuTone,
} from "../../types";
import { makeBooleanProp, makeNumberProp, makeStringProp } from "../../utils/props";

export type PuInputClearTrigger = "focus" | "always";

export const puInputTypes = [
  "text",
  "url",
  "email",
  "tel",
  "search",
  "number",
  "password",
] as const;

export type PuInputType = (typeof puInputTypes)[number];

export const puInputModes = [
  "none",
  "text",
  "decimal",
  "numeric",
  "tel",
  "search",
  "email",
  "url",
] as const;

export type PuInputMode = (typeof puInputModes)[number];

export type PuInputSize = PuSize;
export type PuInputVariant = PuFieldVariant;
export type PuInputTone = PuTone;
export type PuInputAlign = PuAlign;

export const puInputProps = {
  modelValue: makeStringProp(""),
  id: makeStringProp<string | undefined>(undefined),
  name: makeStringProp<string | undefined>(undefined),
  type: {
    type: String as PropType<PuInputType>,
    default: "text",
    validator: (value: string) => puInputTypes.includes(value as PuInputType),
  },
  inputmode: {
    type: String as PropType<PuInputMode | undefined>,
    default: undefined,
    validator: (value: string | undefined) =>
      value === undefined || puInputModes.includes(value as PuInputMode),
  },
  autocomplete: makeStringProp<string | undefined>(undefined),
  placeholder: makeStringProp(""),
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  maxlength: makeNumberProp(-1),
  invalid: makeBooleanProp(false),
  align: {
    type: String as PropType<PuInputAlign>,
    default: "start",
    validator: (value: string) => puAligns.includes(value as PuInputAlign),
  },
  size: {
    type: String as PropType<PuInputSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuInputSize),
  },
  variant: {
    type: String as PropType<PuInputVariant>,
    default: "outline",
    validator: (value: string) => puFieldVariants.includes(value as PuInputVariant),
  },
  tone: {
    type: String as PropType<PuInputTone>,
    default: "neutral",
    validator: (value: string) => puTones.includes(value as PuInputTone),
  },
  prefixIcon: makeStringProp(""),
  suffixIcon: makeStringProp(""),
  showPassword: makeBooleanProp(false),
  showCount: makeBooleanProp(false),
  clearable: makeBooleanProp(false),
  clearTrigger: makeStringProp<PuInputClearTrigger>("focus"),
};

export type PuInputProps = typeof puInputProps;

export const puInputEmits = {
  "update:modelValue": (_value: string) => true,
  focus: (_event: FocusEvent) => true,
  blur: (_event: FocusEvent) => true,
  clear: () => true,
  clickPrefixIcon: (_event: MouseEvent) => true,
  clickSuffixIcon: (_event: MouseEvent) => true,
  click: (_event: MouseEvent) => true,
};

export type PuInputEmits = typeof puInputEmits;
