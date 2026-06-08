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

export const puPageHeaderTitleTags = ["h1", "h2", "h3", "h4"] as const;

export type PuPageHeaderDensity = PuDensity;
export type PuPageHeaderSurfaceLevel = PuSurfaceLevel;
export type PuPageHeaderVariant = PuContainerVariant;
export type PuPageHeaderTitleAs = (typeof puPageHeaderTitleTags)[number];

export const puPageHeaderProps = {
  as: makeStringProp("header"),
  title: makeStringProp<string | undefined>(undefined),
  subtitle: makeStringProp<string | undefined>(undefined),
  titleAs: {
    type: String as PropType<PuPageHeaderTitleAs>,
    default: "h1",
    validator: (value: string) =>
      puPageHeaderTitleTags.includes(value as PuPageHeaderTitleAs),
  },
  showBack: makeBooleanProp(false),
  backLabel: makeStringProp("Back"),
  density: {
    type: String as PropType<PuPageHeaderDensity>,
    default: "comfortable",
    validator: (value: string) => puDensities.includes(value as PuDensity),
  },
  surfaceLevel: {
    type: String as PropType<PuPageHeaderSurfaceLevel>,
    default: "plain",
    validator: (value: string) =>
      puSurfaceLevels.includes(value as PuPageHeaderSurfaceLevel),
  },
  variant: {
    type: String as PropType<PuPageHeaderVariant>,
    default: "plain",
    validator: (value: string) =>
      puContainerVariants.includes(value as PuPageHeaderVariant),
  },
  bordered: makeBooleanProp(false),
};

export const puPageHeaderEmits = {
  back: (_event: MouseEvent) => true,
};
