import type { PropType } from "vue";
import {
  puContainerVariants,
  puDensities,
  puSurfaceLevels,
  type PuContainerVariant,
  type PuDensity,
  type PuSurfaceLevel,
} from "../../types";
import { makeStringProp, numericProp } from "../../utils/props";

export type PuBentoItemSpan = 1 | 2 | 3 | 4 | "full";
export type PuBentoItemRowSpan = 1 | 2 | 3;
export type PuBentoItemSurfaceLevel = PuSurfaceLevel;
export type PuBentoItemVariant = PuContainerVariant;
export type PuBentoItemDensity = PuDensity;

export const puBentoItemNumericSpans = [1, 2, 3, 4] as const;
export const puBentoItemRowSpans = [1, 2, 3] as const;

export const isPuBentoItemSpan = (value: unknown): value is PuBentoItemSpan => {
  if (value === "full") {
    return true;
  }

  const numeric = Number(value);
  return puBentoItemNumericSpans.includes(numeric as Exclude<PuBentoItemSpan, "full">);
};

export const isPuBentoItemRowSpan = (
  value: unknown,
): value is PuBentoItemRowSpan => {
  const numeric = Number(value);
  return puBentoItemRowSpans.includes(numeric as PuBentoItemRowSpan);
};

export const puBentoItemProps = {
  as: makeStringProp("section"),
  title: makeStringProp<string | undefined>(undefined),
  description: makeStringProp<string | undefined>(undefined),
  span: {
    type: numericProp as unknown as PropType<PuBentoItemSpan>,
    default: 1,
    validator: isPuBentoItemSpan,
  },
  rowSpan: {
    type: numericProp as unknown as PropType<PuBentoItemRowSpan>,
    default: 1,
    validator: isPuBentoItemRowSpan,
  },
  surfaceLevel: {
    type: String as PropType<PuBentoItemSurfaceLevel>,
    default: "section",
    validator: (value: string) =>
      puSurfaceLevels.includes(value as PuBentoItemSurfaceLevel),
  },
  variant: {
    type: String as PropType<PuBentoItemVariant>,
    default: "soft",
    validator: (value: string) =>
      puContainerVariants.includes(value as PuBentoItemVariant),
  },
  density: {
    type: String as PropType<PuBentoItemDensity>,
    default: "comfortable",
    validator: (value: string) => puDensities.includes(value as PuDensity),
  },
};
