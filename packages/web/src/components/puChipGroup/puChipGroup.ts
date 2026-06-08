import type { PropType } from "vue";
import { puAligns, puGaps, type PuAlign, type PuGap } from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuChipGroupGap = PuGap;
export type PuChipGroupAlign = PuAlign;

export const puChipGroupProps = {
  as: makeStringProp("div"),
  gap: {
    type: String as PropType<PuChipGroupGap>,
    default: "sm",
    validator: (value: string) => puGaps.includes(value as PuGap),
  },
  align: {
    type: String as PropType<PuChipGroupAlign>,
    default: "start",
    validator: (value: string) => puAligns.includes(value as PuAlign),
  },
  wrap: makeBooleanProp(true),
  fit: makeBooleanProp(false),
};
