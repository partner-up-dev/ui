import type { PropType } from "vue";
import {
  puContainerVariants,
  puDensities,
  puSurfaceLevels,
  type PuContainerVariant,
  type PuDensity,
  type PuSurfaceLevel,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuCellGroupSurfaceLevel = PuSurfaceLevel;
export type PuCellGroupVariant = PuContainerVariant;
export type PuCellGroupDensity = PuDensity;

export const puCellGroupProps = {
  as: makeStringProp("section"),
  title: makeStringProp<string | undefined>(undefined),
  description: makeStringProp<string | undefined>(undefined),
  surfaceLevel: {
    type: String as PropType<PuCellGroupSurfaceLevel>,
    default: "plain",
    validator: (value: string) =>
      puSurfaceLevels.includes(value as PuCellGroupSurfaceLevel),
  },
  variant: {
    type: String as PropType<PuCellGroupVariant>,
    default: "plain",
    validator: (value: string) =>
      puContainerVariants.includes(value as PuCellGroupVariant),
  },
  density: {
    type: String as PropType<PuCellGroupDensity>,
    default: "comfortable",
    validator: (value: string) => puDensities.includes(value as PuDensity),
  },
  dividers: makeBooleanProp(true),
  inset: makeBooleanProp(false),
};
