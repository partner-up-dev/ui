import type { ExtractPropTypes, PropType } from "vue";
import { puSizes, puTones, type PuSize, type PuTone } from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuCheckboxSize = PuSize;
export type PuCheckboxTone = PuTone;

export const puCheckboxProps = {
  modelValue: makeBooleanProp(false),
  tone: {
    type: String as PropType<PuCheckboxTone>,
    default: "primary",
    validator: (value: string) => puTones.includes(value as PuCheckboxTone),
  },
  size: {
    type: String as PropType<PuCheckboxSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuCheckboxSize),
  },
  disabled: makeBooleanProp(false),
  id: makeStringProp<string | undefined>(undefined),
  name: makeStringProp<string | undefined>(undefined),
  ariaLabel: makeStringProp<string | undefined>(undefined),
};

export type PuCheckboxProps = ExtractPropTypes<typeof puCheckboxProps>;

export const puCheckboxEmits = {
  "update:modelValue": (_value: boolean) => true,
  change: (_value: boolean) => true,
};

export type PuCheckboxEmits = typeof puCheckboxEmits;
