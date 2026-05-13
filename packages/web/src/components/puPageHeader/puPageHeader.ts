import type { PropType } from "vue";
import {
  puDensities,
  puSurfaceTones,
  type PuDensity,
  type PuSurfaceTone,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export const puPageHeaderTitleTags = ["h1", "h2", "h3", "h4"] as const;

export type PuPageHeaderDensity = PuDensity;
export type PuPageHeaderTone = PuSurfaceTone;
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
  tone: {
    type: String as PropType<PuPageHeaderTone>,
    default: "plain",
    validator: (value: string) => puSurfaceTones.includes(value as PuSurfaceTone),
  },
  bordered: makeBooleanProp(false),
};

export const puPageHeaderEmits = {
  back: (_event: MouseEvent) => true,
};
