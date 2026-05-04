import type { PropType } from "vue";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export type PuInfoRowLayout = "inline" | "stack";
export type PuInfoRowAlign = "start" | "end";
export type PuInfoRowValue = string | number | null;

export const puInfoRowProps = {
  label: makeStringProp<string | undefined>(undefined),
  value: {
    type: [String, Number, null] as unknown as PropType<PuInfoRowValue>,
    default: null,
  },
  layout: makeStringProp<PuInfoRowLayout>("inline"),
  align: makeStringProp<PuInfoRowAlign>("end"),
  collapseOnMobile: makeBooleanProp(true),
};

