import type { ExtractPropTypes, PropType } from "vue";
import { puSizes, type PuSize } from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuMultiStopToggleValue = string | number;

export type PuMultiStopToggleOption = {
  value: PuMultiStopToggleValue;
  label: string;
  ariaLabel?: string;
};

export type PuMultiStopToggleSize = PuSize;

export const puMultiStopToggleProps = {
  modelValue: {
    type: [String, Number] as PropType<PuMultiStopToggleValue>,
    required: true as const,
  },
  options: {
    type: Array as PropType<readonly PuMultiStopToggleOption[]>,
    default: () => [],
  },
  ariaLabel: makeStringProp<string | undefined>(undefined),
  ariaLabelledby: makeStringProp<string | undefined>(undefined),
  disabled: makeBooleanProp(false),
  size: {
    type: String as PropType<PuMultiStopToggleSize>,
    default: "md",
    validator: (value: string) =>
      puSizes.includes(value as PuMultiStopToggleSize),
  },
};

export type PuMultiStopToggleProps = ExtractPropTypes<
  typeof puMultiStopToggleProps
>;

export const puMultiStopToggleEmits = {
  "update:modelValue": (_value: PuMultiStopToggleValue) => true,
  change: (
    _value: PuMultiStopToggleValue,
    _option: PuMultiStopToggleOption,
    _index: number,
  ) => true,
};

export type PuMultiStopToggleEmits = typeof puMultiStopToggleEmits;

