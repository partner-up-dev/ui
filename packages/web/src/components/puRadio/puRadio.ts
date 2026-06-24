import type { ExtractPropTypes, PropType } from "vue";
import { puSizes, puTones, type PuSize, type PuTone } from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuRadioValue = string | number | boolean;
export type PuRadioSize = PuSize;
export type PuRadioTone = PuTone;

export const puRadioProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<PuRadioValue | undefined>,
    default: undefined,
  },
  value: {
    type: [String, Number, Boolean] as PropType<PuRadioValue>,
    required: true as const,
  },
  tone: {
    type: String as PropType<PuRadioTone>,
    default: "primary",
    validator: (value: string) => puTones.includes(value as PuRadioTone),
  },
  size: {
    type: String as PropType<PuRadioSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuRadioSize),
  },
  disabled: makeBooleanProp(false),
  id: makeStringProp<string | undefined>(undefined),
  name: makeStringProp<string | undefined>(undefined),
  ariaLabel: makeStringProp<string | undefined>(undefined),
};

export type PuRadioProps = ExtractPropTypes<typeof puRadioProps>;

export const puRadioEmits = {
  "update:modelValue": (_value: PuRadioValue) => true,
  change: (_value: PuRadioValue) => true,
} as const;

export type PuRadioEmits = typeof puRadioEmits;
