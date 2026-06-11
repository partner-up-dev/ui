import type { ExtractPropTypes, PropType } from "vue";
import { puSizes, type PuSize } from "../../types";
import { makeBooleanProp } from "../../utils/props";

export type PuToggleSwitchSize = PuSize;

export const puToggleSwitchProps = {
  modelValue: {
    type: Boolean,
    required: true as const,
  },
  label: {
    type: String,
    required: true as const,
  },
  disabled: makeBooleanProp(false),
  size: {
    type: String as PropType<PuToggleSwitchSize>,
    default: "md",
    validator: (value: string) =>
      puSizes.includes(value as PuToggleSwitchSize),
  },
};

export type PuToggleSwitchProps = ExtractPropTypes<typeof puToggleSwitchProps>;

export const puToggleSwitchEmits = {
  "update:modelValue": (_value: boolean) => true,
  change: (_value: boolean) => true,
};

export type PuToggleSwitchEmits = typeof puToggleSwitchEmits;
