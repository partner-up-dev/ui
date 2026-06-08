import type { PropType } from "vue";
import type { PuContainerVariant, PuTone } from "../../types";
import { makeBooleanProp, makeNumberProp, makeStringProp } from "../../utils/props";

export type PuWheelPickerValue = string | number;

export type PuWheelPickerOption = {
  label: string;
  value: PuWheelPickerValue;
  disabled?: boolean;
};

export type PuWheelPickerTone = PuTone;
export type PuWheelPickerVariant = PuContainerVariant;

export const puWheelPickerProps = {
  modelValue: {
    type: [String, Number, null] as unknown as PropType<PuWheelPickerValue | null>,
    default: null,
  },
  options: {
    type: Array as PropType<readonly PuWheelPickerOption[]>,
    required: true as const,
  },
  tone: makeStringProp<PuWheelPickerTone>("neutral"),
  variant: makeStringProp<PuWheelPickerVariant>("soft"),
  itemHeight: makeNumberProp(44),
  visibleCount: makeNumberProp(5),
  disabled: makeBooleanProp(false),
  ariaLabel: makeStringProp("Wheel picker"),
  emptyLabel: makeStringProp<string | null>(null),
};

export const puWheelPickerEmits = {
  "update:modelValue": (_value: PuWheelPickerValue) => true,
  change: (_value: PuWheelPickerValue, _option: PuWheelPickerOption, _index: number) => true,
};
