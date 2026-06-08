import type { PropType } from "vue";
import {
  puContainerVariants,
  puSurfaceLevels,
  type PuAlign,
  type PuContainerVariant,
  type PuSurfaceLevel,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export const puEmptyStateAligns = ["start", "center"] as const;

export type PuEmptyStateAlign = Extract<PuAlign, "start" | "center">;
export type PuEmptyStateSurfaceLevel = PuSurfaceLevel;
export type PuEmptyStateVariant = PuContainerVariant;

export const puEmptyStateProps = {
  as: makeStringProp("section"),
  title: makeStringProp<string | undefined>(undefined),
  description: makeStringProp<string | undefined>(undefined),
  icon: makeStringProp<string | undefined>(undefined),
  compact: makeBooleanProp(false),
  align: {
    type: String as PropType<PuEmptyStateAlign>,
    default: "center",
    validator: (value: string) => puEmptyStateAligns.includes(value as PuEmptyStateAlign),
  },
  surfaceLevel: {
    type: String as PropType<PuEmptyStateSurfaceLevel>,
    default: "section",
    validator: (value: string) =>
      puSurfaceLevels.includes(value as PuEmptyStateSurfaceLevel),
  },
  variant: {
    type: String as PropType<PuEmptyStateVariant>,
    default: "soft",
    validator: (value: string) =>
      puContainerVariants.includes(value as PuEmptyStateVariant),
  },
};
