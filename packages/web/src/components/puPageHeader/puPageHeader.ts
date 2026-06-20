import type { PropType } from "vue";
import {
  puContainerVariants,
  puSizes,
  type PuContainerVariant,
  type PuLayout,
  type PuSize,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export const puPageHeaderTitleTags = ["h1", "h2", "h3", "h4"] as const;
export const puPageHeaderLayouts = ["inline", "stack"] as const satisfies readonly PuLayout[];

export type PuPageHeaderLayout = (typeof puPageHeaderLayouts)[number];
export type PuPageHeaderSize = PuSize;
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
  layout: {
    type: String as PropType<PuPageHeaderLayout>,
    default: "inline",
    validator: (value: string) =>
      puPageHeaderLayouts.includes(value as PuPageHeaderLayout),
  },
  size: {
    type: String as PropType<PuPageHeaderSize>,
    default: "md",
    validator: (value: string) => puSizes.includes(value as PuPageHeaderSize),
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
