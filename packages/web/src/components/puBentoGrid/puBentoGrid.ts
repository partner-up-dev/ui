import type { PropType } from "vue";
import {
  puBreakpoints,
  puGaps,
  type PuBreakpoint,
  type PuGap,
} from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuBentoGridColumns = 2 | 3 | 4;
export type PuBentoGridGap = PuGap;
export type PuBentoGridCollapseAt = PuBreakpoint;

export const puBentoGridColumns = [2, 3, 4] as const;

export const puBentoGridProps = {
  as: makeStringProp("div"),
  columns: {
    type: Number as PropType<PuBentoGridColumns>,
    default: 2,
    validator: (value: number) =>
      puBentoGridColumns.includes(value as PuBentoGridColumns),
  },
  gap: {
    type: String as PropType<PuBentoGridGap>,
    default: "md",
    validator: (value: string) => puGaps.includes(value as PuGap),
  },
  collapseAt: {
    type: String as PropType<PuBentoGridCollapseAt>,
    default: "md",
    validator: (value: string) => puBreakpoints.includes(value as PuBreakpoint),
  },
  autoRows: makeStringProp("minmax(120px, auto)"),
  dense: makeBooleanProp(false),
};
