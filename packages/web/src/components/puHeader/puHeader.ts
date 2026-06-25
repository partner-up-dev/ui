import type { PropType } from "vue";
import { puSizes, type PuSize } from "../../types";
import { makeStringProp } from "../../utils/props";

export const puHeaderTitleTags = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
] as const;
export const puHeaderVariants = ["plain", "line"] as const;

export type PuHeaderSize = PuSize;
export type PuHeaderVariant = (typeof puHeaderVariants)[number];
export type PuHeaderTitleAs = (typeof puHeaderTitleTags)[number];

export const puHeaderProps = {
  as: makeStringProp("div"),
  title: makeStringProp<string | undefined>(undefined),
  subtitle: makeStringProp<string | undefined>(undefined),
  titleId: makeStringProp<string | undefined>(undefined),
  subtitleId: makeStringProp<string | undefined>(undefined),
  titleAs: {
    type: String as PropType<PuHeaderTitleAs>,
    default: "h2",
    validator: (value: string) =>
      puHeaderTitleTags.includes(value as PuHeaderTitleAs),
  },
  size: {
    type: String as PropType<PuHeaderSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuHeaderSize),
  },
  variant: {
    type: String as PropType<PuHeaderVariant>,
    default: "plain",
    validator: (value: string) =>
      puHeaderVariants.includes(value as PuHeaderVariant),
  },
};
