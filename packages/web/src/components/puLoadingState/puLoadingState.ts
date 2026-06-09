import type { PropType } from "vue";
import {
  puContainerVariants,
  puExtendedSizes,
  puSurfaceLevels,
  type PuAlign,
  type PuContainerVariant,
  type PuExtendedSize,
  type PuSurfaceLevel,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export const puLoadingStateAligns = ["start", "center"] as const;

export type PuLoadingStateAlign = Extract<PuAlign, "start" | "center">;
export type PuLoadingStateSize = PuExtendedSize;
export type PuLoadingStateSurfaceLevel = PuSurfaceLevel;
export type PuLoadingStateVariant = PuContainerVariant;

export const puLoadingStateProps = {
  as: makeStringProp("section"),
  title: makeStringProp<string | undefined>(undefined),
  message: makeStringProp<string | undefined>(undefined),
  label: makeStringProp<string | undefined>(undefined),
  compact: makeBooleanProp(false),
  busy: makeBooleanProp(true),
  align: {
    type: String as PropType<PuLoadingStateAlign>,
    default: "center",
    validator: (value: string) =>
      puLoadingStateAligns.includes(value as PuLoadingStateAlign),
  },
  size: {
    type: String as PropType<PuLoadingStateSize>,
    default: "lg",
    validator: (value: string) =>
      puExtendedSizes.includes(value as PuLoadingStateSize),
  },
  surfaceLevel: {
    type: String as PropType<PuLoadingStateSurfaceLevel>,
    default: "plain",
    validator: (value: string) =>
      puSurfaceLevels.includes(value as PuLoadingStateSurfaceLevel),
  },
  variant: {
    type: String as PropType<PuLoadingStateVariant>,
    default: "plain",
    validator: (value: string) =>
      puContainerVariants.includes(value as PuLoadingStateVariant),
  },
};
