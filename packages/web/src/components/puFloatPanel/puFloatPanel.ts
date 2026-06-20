import type { ExtractPropTypes, PropType } from "vue";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuFloatPanelValue = string | number;

export type PuFloatPanelStop = {
  value: PuFloatPanelValue;
  label: string;
  height: number;
  disabled?: boolean;
};

export const puFloatPanelPositions = ["absolute", "fixed"] as const;

export type PuFloatPanelPosition = (typeof puFloatPanelPositions)[number];

export const puFloatPanelProps = {
  modelValue: {
    type: [String, Number] as PropType<PuFloatPanelValue>,
    required: true as const,
  },
  stops: {
    type: Array as PropType<readonly PuFloatPanelStop[]>,
    default: () => [],
  },
  position: {
    type: String as PropType<PuFloatPanelPosition>,
    default: "absolute",
    validator: (value: string) =>
      puFloatPanelPositions.includes(value as PuFloatPanelPosition),
  },
  ariaLabel: makeStringProp("Float panel position"),
  ariaLabelledby: makeStringProp<string | undefined>(undefined),
  disabled: makeBooleanProp(false),
  contentPadding: makeBooleanProp(true),
  zIndex: {
    type: [String, Number] as PropType<string | number>,
    default: "auto",
  },
};

export type PuFloatPanelProps = ExtractPropTypes<typeof puFloatPanelProps>;

export const puFloatPanelEmits = {
  "update:modelValue": (_value: PuFloatPanelValue) => true,
  change: (
    _value: PuFloatPanelValue,
    _stop: PuFloatPanelStop,
    _index: number,
  ) => true,
};

export type PuFloatPanelEmits = typeof puFloatPanelEmits;
