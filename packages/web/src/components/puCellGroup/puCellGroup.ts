import type { PropType } from "vue";
import {
  puDensities,
  puSurfaceTones,
  type PuDensity,
  type PuSurfaceTone,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuCellGroupTone = PuSurfaceTone;
export type PuCellGroupDensity = PuDensity;

export const puCellGroupProps = {
  as: makeStringProp("section"),
  title: makeStringProp<string | undefined>(undefined),
  description: makeStringProp<string | undefined>(undefined),
  tone: {
    type: String as PropType<PuCellGroupTone>,
    default: "plain",
    validator: (value: string) => puSurfaceTones.includes(value as PuSurfaceTone),
  },
  density: {
    type: String as PropType<PuCellGroupDensity>,
    default: "comfortable",
    validator: (value: string) => puDensities.includes(value as PuDensity),
  },
  dividers: makeBooleanProp(true),
  inset: makeBooleanProp(false),
};
