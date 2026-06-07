import type { PropType } from "vue";
import {
  puCommonTones,
  puDensities,
  puOrientations,
  puSizes,
  type PuDensity,
  type PuOrientation,
  type PuSize,
  type PuTone,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuSegmentedValue = string | number;
export type PuSegmentedSemantics = "radio" | "tabs";
export type PuSegmentedActivation = "automatic" | "manual";
export type PuSegmentedSize = PuSize;
export type PuSegmentedDensity = PuDensity;
export type PuSegmentedOrientation = PuOrientation;
export type PuSegmentedTone = PuTone;

export const puSegmentedSemantics = ["radio", "tabs"] as const;
export const puSegmentedActivations = ["automatic", "manual"] as const;

export const puSegmentedProps = {
  modelValue: {
    type: [String, Number] as PropType<PuSegmentedValue | undefined>,
    default: undefined,
  },
  semantics: {
    type: String as PropType<PuSegmentedSemantics>,
    default: "radio",
    validator: (value: string) =>
      puSegmentedSemantics.includes(value as PuSegmentedSemantics),
  },
  activation: {
    type: String as PropType<PuSegmentedActivation>,
    default: "automatic",
    validator: (value: string) =>
      puSegmentedActivations.includes(value as PuSegmentedActivation),
  },
  disabled: makeBooleanProp(false),
  orientation: {
    type: String as PropType<PuSegmentedOrientation>,
    default: "horizontal",
    validator: (value: string) => puOrientations.includes(value as PuOrientation),
  },
  size: {
    type: String as PropType<PuSegmentedSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuSize),
  },
  density: {
    type: String as PropType<PuSegmentedDensity>,
    default: "comfortable",
    validator: (value: string) => puDensities.includes(value as PuDensity),
  },
  tone: {
    type: String as PropType<PuSegmentedTone>,
    default: "surface",
    validator: (value: string) => puCommonTones.includes(value as PuTone),
  },
  fullWidth: makeBooleanProp(false),
  equalWidth: makeBooleanProp(false),
  ariaLabel: makeStringProp<string | undefined>(undefined),
  ariaLabelledby: makeStringProp<string | undefined>(undefined),
};

export const puSegmentedEmits = {
  "update:modelValue": (_value: PuSegmentedValue) => true,
  change: (_value: PuSegmentedValue) => true,
} as const;
