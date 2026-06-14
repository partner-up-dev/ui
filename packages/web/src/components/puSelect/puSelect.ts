import type { PropType } from "vue";
import {
  puFieldVariants,
  puSizes,
  puTones,
  type PuFieldVariant,
  type PuSize,
  type PuTone,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuSelectValue = string | number | null;
export type PuSelectSize = PuSize;
export type PuSelectVariant = PuFieldVariant;
export type PuSelectTone = PuTone;

export interface PuSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export const puSelectProps = {
  modelValue: {
    type: [String, Number] as PropType<PuSelectValue>,
    default: null,
  },
  options: {
    type: Array as PropType<PuSelectOption[]>,
    default: () => [],
  },
  placeholder: makeStringProp<string | undefined>(undefined),
  disabled: makeBooleanProp(false),
  readonly: makeBooleanProp(false),
  invalid: makeBooleanProp(false),
  clearable: makeBooleanProp(false),
  size: {
    type: String as PropType<PuSelectSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuSelectSize),
  },
  variant: {
    type: String as PropType<PuSelectVariant>,
    default: "outline",
    validator: (value: string) =>
      puFieldVariants.includes(value as PuSelectVariant),
  },
  tone: {
    type: String as PropType<PuSelectTone>,
    default: "neutral",
    validator: (value: string) => puTones.includes(value as PuSelectTone),
  },
};

export type PuSelectProps = typeof puSelectProps;

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

export type PuSelectEmits = typeof puSelectEmits;
