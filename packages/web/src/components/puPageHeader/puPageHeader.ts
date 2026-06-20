import type { PropType } from "vue";
import { puSizes, type PuSize } from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export const puPageHeaderTitleTags = ["h1", "h2", "h3", "h4"] as const;
export const puPageHeaderVariants = ["plain", "line"] as const;

export type PuPageHeaderSize = PuSize;
export type PuPageHeaderVariant = (typeof puPageHeaderVariants)[number];
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
  size: {
    type: String as PropType<PuPageHeaderSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuPageHeaderSize),
  },
  variant: {
    type: String as PropType<PuPageHeaderVariant>,
    default: "plain",
    validator: (value: string) =>
      puPageHeaderVariants.includes(value as PuPageHeaderVariant),
  },
};

export const puPageHeaderEmits = {
  back: (_event: MouseEvent) => true,
};
