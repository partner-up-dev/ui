import type { PropType } from "vue";
import {
  makeBooleanProp,
  makeNumberProp,
  makeStringProp,
  numericProp,
} from "../../utils/props";

export const puSkeletonVariants = ["text", "rect", "rounded", "circle"] as const;
export const puSkeletonAnimations = ["pulse", "wave", "none"] as const;
export const puSkeletonGaps = ["xs", "sm", "md"] as const;

export type PuSkeletonVariant = (typeof puSkeletonVariants)[number];
export type PuSkeletonAnimation = (typeof puSkeletonAnimations)[number];
export type PuSkeletonGap = (typeof puSkeletonGaps)[number];
export type PuSkeletonDimension = string | number;
export type PuSkeletonRowWidth = PuSkeletonDimension | PuSkeletonDimension[];

export const puSkeletonProps = {
  as: makeStringProp("span"),
  loading: makeBooleanProp(true),
  variant: {
    type: String as PropType<PuSkeletonVariant>,
    default: "text",
    validator: (value: string) => puSkeletonVariants.includes(value as PuSkeletonVariant),
  },
  animation: {
    type: String as PropType<PuSkeletonAnimation>,
    default: "pulse",
    validator: (value: string) =>
      puSkeletonAnimations.includes(value as PuSkeletonAnimation),
  },
  width: {
    type: numericProp,
    default: undefined,
  },
  height: {
    type: numericProp,
    default: undefined,
  },
  radius: {
    type: numericProp,
    default: undefined,
  },
  rows: makeNumberProp(1),
  rowWidth: {
    type: [String, Number, Array] as PropType<PuSkeletonRowWidth>,
    default: undefined,
  },
  gap: {
    type: String as PropType<PuSkeletonGap>,
    default: "sm",
    validator: (value: string) => puSkeletonGaps.includes(value as PuSkeletonGap),
  },
  block: makeBooleanProp(false),
  announce: makeBooleanProp(false),
  loadingText: makeStringProp("Loading"),
};
