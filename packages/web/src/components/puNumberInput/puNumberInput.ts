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
import { makeBooleanProp, makeStringProp } from "../../utils/props";
import { puInputModes, type PuInputMode } from "../puInput/puInput";

export type PuNumberInputValue = number | null;
export type PuNumberInputStep = number | "any";
export type PuNumberInputAlign = PuAlign;
export type PuNumberInputSize = PuSize;
export type PuNumberInputVariant = PuFieldVariant;
export type PuNumberInputTone = PuTone;

export const puNumberInputProps = {
  modelValue: {
    type: Number as PropType<PuNumberInputValue>,
    default: null,
  },
  placeholder: makeStringProp(""),
  inputmode: {
    type: String as PropType<PuInputMode | undefined>,
    default: undefined,
    validator: (value: string | undefined) =>
      value === undefined || puInputModes.includes(value as PuInputMode),
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
    validator: (value: PuNumberInputStep | undefined) =>
      value === undefined || value === "any" || typeof value === "number",
  },
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  invalid: makeBooleanProp(false),
  align: {
    type: String as PropType<PuNumberInputAlign>,
    default: "start",
    validator: (value: string) => puAligns.includes(value as PuNumberInputAlign),
  },
  size: {
    type: String as PropType<PuNumberInputSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuNumberInputSize),
  },
  variant: {
    type: String as PropType<PuNumberInputVariant>,
    default: "outline",
    validator: (value: string) =>
      puFieldVariants.includes(value as PuNumberInputVariant),
  },
  tone: {
    type: String as PropType<PuNumberInputTone>,
    default: "neutral",
    validator: (value: string) => puTones.includes(value as PuNumberInputTone),
  },
  clearable: makeBooleanProp(false),
};

export type PuNumberInputProps = typeof puNumberInputProps;

export const puNumberInputEmits = {
  "update:modelValue": (_value: PuNumberInputValue) => true,
  change: (_value: PuNumberInputValue, _event: Event) => true,
  focus: (_event: FocusEvent) => true,
  blur: (_event: FocusEvent) => true,
  clear: () => true,
};

export type PuNumberInputEmits = typeof puNumberInputEmits;
