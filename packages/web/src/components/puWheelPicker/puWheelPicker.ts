import type { PropType } from "vue";
import { makeBooleanProp, makeNumberProp, makeStringProp } from "../../utils/props";

export type PuWheelPickerValue = string | number;

export type PuWheelPickerOption = {
  label: string;
  value: PuWheelPickerValue;
  disabled?: boolean;
};

export type PuWheelPickerTone =
  | "surface"
  | "outline"
  | "primary"
  | "secondary"
  | "tertiary";

export type PuWheelPickerVariant = PuWheelPickerTone | "teritary";

export const puWheelPickerProps = {
  modelValue: {
    type: [String, Number, null] as unknown as PropType<PuWheelPickerValue | null>,
    default: null,
  },
  options: {
    type: Array as PropType<readonly PuWheelPickerOption[]>,
    required: true as const,
  },
  variant: makeStringProp<PuWheelPickerVariant>("surface"),
  tone: makeStringProp<PuWheelPickerVariant | undefined>(undefined),
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

