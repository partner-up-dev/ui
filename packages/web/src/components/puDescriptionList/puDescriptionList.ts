import type { PropType } from "vue";
import {
  puContainerVariants,
  puDensities,
  puLayouts,
  puSurfaceLevels,
  type PuContainerVariant,
  type PuDensity,
  type PuLayout,
  type PuSurfaceLevel,
} from "../../types";
import { makeBooleanProp, makeNumberProp, makeStringProp } from "../../utils/props";
import type { PuDescriptionLabelAlign } from "./context";

export type PuDescriptionListColumns = 1 | 2;
export type PuDescriptionListSurfaceLevel = PuSurfaceLevel;
export type PuDescriptionListVariant = PuContainerVariant;
export type PuDescriptionListDensity = PuDensity;
export type PuDescriptionListLayout = PuLayout;

export const puDescriptionLabelAligns = ["start", "end"] as const;

export const puDescriptionListProps = {
  as: makeStringProp("section"),
  title: makeStringProp<string | undefined>(undefined),
  description: makeStringProp<string | undefined>(undefined),
  layout: {
    type: String as PropType<PuDescriptionListLayout>,
    default: "stack",
    validator: (value: string) => puLayouts.includes(value as PuLayout),
  },
  density: {
    type: String as PropType<PuDescriptionListDensity>,
    default: "comfortable",
    validator: (value: string) => puDensities.includes(value as PuDensity),
  },
  surfaceLevel: {
    type: String as PropType<PuDescriptionListSurfaceLevel>,
    default: "plain",
    validator: (value: string) =>
      puSurfaceLevels.includes(value as PuDescriptionListSurfaceLevel),
  },
  variant: {
    type: String as PropType<PuDescriptionListVariant>,
    default: "plain",
    validator: (value: string) =>
      puContainerVariants.includes(value as PuDescriptionListVariant),
  },
  bordered: makeBooleanProp(false),
  dividers: makeBooleanProp(true),
  labelWidth: makeStringProp("7rem"),
  labelAlign: {
    type: String as PropType<PuDescriptionLabelAlign>,
    default: "start",
    validator: (value: string) =>
      puDescriptionLabelAligns.includes(value as PuDescriptionLabelAlign),
  },
  columns: makeNumberProp<PuDescriptionListColumns>(1),
  collapseOnMobile: makeBooleanProp(true),
  emptyText: makeStringProp("-"),
};
